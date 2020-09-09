declare module 'diagram-js/lib/model' {
  export interface Base {
    businessObject?: any
    [other: string]: any
  }
  export interface Shape extends Base {}
  export interface Root extends Shape {}
  export interface Label extends Shape {}
  export interface Connection extends Base {}
}
