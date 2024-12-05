import { fromHex, SpendingValidator, toHex } from "lucid-cardano"
import marketplace from "./plutus.json"
import { encode } from "cbor-x";

// Returns a SpendingValidator object that can be used in transactions
const readValidator = (): SpendingValidator => {
    const marketplaceValidator = marketplace.validators.find((validator) => validator.title === "marketplace.marketplace");

    if (!marketplaceValidator) {
        throw new Error("marketplace validator not found");
    }

    // The validator code from the JSON file needs to be processed to match Lucid's expected format:
    // 1. The compiled code is stored as a hex string, so we first convert it to bytes
    // 2. The bytes need to be CBOR encoded since that's what Cardano nodes expect
    // 3. Finally convert back to hex string since that's what Lucid's API accepts
    // const marketplaceScript = toHex(encode(fromHex(marketplaceValidator.compiledCode)));

    // Return the validator in the format expected by Lucid
    return {
        type: "PlutusV2",
        script: marketplaceValidator.compiledCode, // The processed validator code
    }
}

export default readValidator;