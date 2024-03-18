export namespace ListingApplicationEvent {
  export namespace ListingCreated {
    export const key = 'listing.application.listing.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
