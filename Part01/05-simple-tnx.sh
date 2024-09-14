#!/usr/bin/bash
# usage:
# ./send_tnx.sh source.addr source.skey dst.addr spent_amount

if [ -z "$1" ]; then
	echo "please input source address"
	exit 1
fi

if [ -z "$2" ]; then
	echo "please input source key"
	exit 1
fi

if [ -z "$3" ]; then
	echo "please input dest address"
	exit 1
fi

if [ -z "$4" ]; then
    echo "please input amount you want to transfer"
    exit 1
fi

TESTNETMAGIC=2
SRC_ADDR=$1
SRC_SKEY=$2
DST_ADDR=$3
SPEND_AMOUNT=$4
echo "prepare to transfer from $SRC_ADDR to $DST_ADDR with amount $SPEND_AMOUNT"

echo "getting utxos"
cardano-cli query utxo --address $(cat $SRC_ADDR) --testnet-magic $TESTNETMAGIC > utxos.txt

UTXO=`cat utxos.txt | tail -1 | awk '{print $1"#"$2}'`
echo "source address $UTXO"

SRC_AMOUNT=`cat utxos.txt | tail -1 | awk '{print $3}'`
echo "source amount $SRC_AMOUNT"

cardano-cli transaction build-raw \
--tx-in $UTXO \
--tx-out $(cat $SRC_ADDR)+0 \
--tx-out $(cat $DST_ADDR)+0 \
--invalid-hereafter 0 \
--fee 0 \
--out-file tx.draft


# get protocol json
cardano-cli query protocol-parameters \
  --testnet-magic $TESTNETMAGIC \
  --out-file protocol.json

FEE=$(cardano-cli transaction calculate-min-fee \
    --tx-body-file tx.draft \
    --tx-in-count 1 \
    --tx-out-count 2 \
    --witness-count 1 \
    --byron-witness-count 0 \
    --testnet-magic $TESTNETMAGIC \
    --protocol-params-file protocol.json | grep -oP "\d+")
echo "tnx fee $FEE"


REMAIN_AMOUNT=`expr $SRC_AMOUNT - $SPEND_AMOUNT - $FEE`
echo "remaining amoung $REMAIN_AMOUNT"

CURR_SLOT=`cardano-cli query tip --testnet-magic $TESTNETMAGIC | grep slot | grep -oP "\d+"`
TARGET_SLOT=`expr $CURR_SLOT + 10`

echo "buiding raw tnx"
cardano-cli transaction build-raw \
--tx-in $UTXO \
--tx-out $(cat $DST_ADDR)+$SPEND_AMOUNT \
--tx-out $(cat $SRC_ADDR)+$REMAIN_AMOUNT \
--invalid-hereafter $TARGET_SLOT \
--fee $FEE \
--out-file tx.raw

echo "sign raw tnx"
cardano-cli transaction sign \
--tx-body-file tx.raw \
--signing-key-file $(cat $SRC_SKEY) \
--testnet-magic $TESTNETMAGIC \
--out-file tx.signed

echo "submit tnx"
cardano-cli transaction submit \
--tx-file tx.signed \
--testnet-magic $TESTNETMAGIC
