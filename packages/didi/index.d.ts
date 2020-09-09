declare module 'didi' {
  export interface Module {
    __init__?: Array<String>
    __depends__?: Array<Module>
  }

  export interface Injector {
    instantiate(type: any): any
  }
}
