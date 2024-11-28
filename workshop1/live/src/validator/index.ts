import { fromHex, SpendingValidator, toHex } from "lucid-cardano";
import plutus from "./plutus.json";
import { encode } from "cbor-x";

export function getValidator(): SpendingValidator {
    const helloWorldValidator = plutus.validators.find((validator) => validator.title === "hello_world.hello_world");

    if (!helloWorldValidator) {
        throw new Error("Validator not found");
    }

    const helloWorldScript = toHex(encode(fromHex(helloWorldValidator.compiledCode)));

    return {
        type: "PlutusV2",
        script: helloWorldScript
    }
}