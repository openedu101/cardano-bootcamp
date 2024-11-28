import { Data } from "lucid-cardano";

const HelloWorldDatumSchema = Data.Object({
    owner: Data.Bytes()
})

// enable type safety when accessing the datum fields
type HelloWorldDatum = Data.Static<typeof HelloWorldDatumSchema>;

export const HelloWorldDatum = HelloWorldDatumSchema as unknown as HelloWorldDatum
