# Develop cardano smart contract with aiken

## Untyped plutus code part 1

- Overview https://aiken-lang.org/uplc

## Untyped plutus code part 2

## Re visit aiken cli

```
aiken uplc eval
aiken uplc encode
aiken uplc decode 
```
## Compare uplc between aiken and plutusTx

- use plutus always true validtor to compare with hellow_work.ak validtor (same logic always return true)

    - plutus

    ```
    cat cbor-script-file | xxd -r -p > binary-script-file

    cabal run uplc convert -- --if flat -i binary-script-file

    ```
    - aiken

    ```
    aiken uplc decode ~/sandbox/always_true.flat
    aiken uplc decode --hex ~/sandbox/always_true.cbor.hex

    ```

## More about uplc builtin func and primitive type


## References

- [Plutus repo](https://github.com/IntersectMBO/plutus)
- [Always True validtor in haskell](https://gist.github.com/ahaxu/47de1d8d8b0d1fa91a93456f6dd37844)
- [Aiken UPLC cli](https://aiken-lang.org/uplc/cli)
- [Decompiling Plutus Core Binary Encoding](https://cardano.stackexchange.com/questions/11436/decompiling-plutus-core-binary-encoding)
