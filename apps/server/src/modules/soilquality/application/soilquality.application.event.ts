export namespace SoilqualityApplicationEvent {
  export namespace SoilqualityCreated {
    export const key = 'soilquality.application.soilquality.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
