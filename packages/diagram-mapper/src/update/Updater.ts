export default interface Updater {
  updateRepresentation(model: object, updateCanvas: boolean, layout: boolean): void
}
