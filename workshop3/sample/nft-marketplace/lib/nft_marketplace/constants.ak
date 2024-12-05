use aiken/transaction/credential.{Address, Inline, VerificationKeyCredential}
use nft_marketplace/types.{VerificationKeyHash}

pub const market_payment_vkh: VerificationKeyHash = #"653cf8ac9fcd24577b3f66e1a0883bd8f6534553923e397c742e34b5"

pub const market_state_vkh: VerificationKeyHash = #"0ce84eca840f5504ea4445e8d327bbc9c2c472bc8ea34978dab58147"

pub fn get_marketplace_address() -> Address {
    Address {
        payment_credential: VerificationKeyCredential(market_payment_vkh),
        stake_credential: Some(Inline(VerificationKeyCredential(market_state_vkh)))
    }
}

pub const market_percentage: Int = 1
