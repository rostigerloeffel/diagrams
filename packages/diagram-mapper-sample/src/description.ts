import * as _ from 'lodash'
import { FOREGROUND_COLOR } from 'diagram-mapper/dist/config/Configuration'
import { DescriptionModel } from 'diagram-mapper/dist/description/model/DescriptionModel'
import library from './library'
import { Location } from 'diagram-mapper/dist/representation/model/Primitives'

export default {
  nodeTemplates: [
    {
      key: 'shelf',
      size: {
        width: 100,
        height: 50,
        resizable: true
      }
    },
    {
      key: 'print',
      size: {
        width: 200,
        height: 100
      },
      fields: [
        {
          key: 'title',
          element: (print: any) => print.title
        },
        {
          key: 'isbn',
          element: (book: any) => book.isbn,
          label: 'ISBN',
          appearance: {
            fill: {
              color: 'white'
            }
          }
        }
      ],
      appearance: {
        fill: {
          color: 'white'
        }
      }
    },
    {
      key: 'book',
      template: 'print',
      fields: [
        {
          key: 'title',
          element: (book: any) => book.title,
          image: 'resources/book.svg',
          appearance: {
            fill: {
              color: FOREGROUND_COLOR
            },
            font: {
              color: 'white'
            }
          }
        },
        {
          key: 'hello',
          element: 'hello',
          appearance: {
            fill: {
              color: 'white'
            }
          }
        }
      ]
    },
    {
      key: 'magazine',
      template: 'print',
      fields: [
        {
          key: 'title',
          element: (book: any) => book.title,
          image: 'resources/magazine.svg'
        }
      ]
    }
  ],

  nodes: [
    {
      element: (library: any) => ({ lib: library }),
      key: 'child-shelf',
      template: 'shelf',

      ports: [
        {
          element: _.identity,
          key: 'test',
          location: Location.West
        },
        {
          element: _.identity,
          key: 'test2',
          location: Location.West
        },
        {
          element: _.identity,
          key: 'test3',
          location: Location.West
        },

        {
          element: _.identity,
          key: 'test4',
          location: Location.East
        },
        {
          element: _.identity,
          key: 'test5',
          location: Location.East
        },

        {
          element: _.identity,
          key: 'test6',
          location: Location.South
        },
        {
          element: _.identity,
          key: 'test7',
          location: Location.South
        }
      ],

      onReceive: (print: any, library: any) => {
        return [
          ...library.filter((p: any) => print.isbn !== p.isbn),
          {
            ...print,
            adults: false
          }
        ]
      },

      children: [
        {
          element: (library: any) => library.lib.filter((print: any) => print.adults === false && print.book === true),
          key: (print: any) => print.isbn,
          template: 'book',
          moveableTo: ['child-shelf', 'adult-shelf']
        },
        {
          element: (library: any) => library.lib.filter((print: any) => print.adults === false && print.book === false),
          key: (print: any) => print.isbn,
          template: 'magazine',
          moveableTo: ['child-shelf', 'adult-shelf']
        }
      ]
    },

    {
      key: 'adult-shelf',
      element: (library: any) => ({ lib: library }),
      template: 'shelf',

      onReceive: (print: any, library: any) => {
        return [
          ...library.filter((p: any) => print.isbn !== p.isbn),
          {
            ...print,
            adults: true
          }
        ]
      },

      children: [
        {
          element: (library: any) => library.lib.filter((print: any) => print.adults === true && print.book === true),
          key: (print: any) => print.isbn,
          template: 'book',
          moveableTo: ['child-shelf', 'adult-shelf']
        },

        {
          element: (library: any) => library.lib.filter((print: any) => print.adults === true && print.book === false),
          key: (print: any) => print.isbn,
          template: 'magazine',
          moveableTo: ['child-shelf', 'adult-shelf']
        }
      ]
    }
  ],

  edges: [
    {
      key: 'edge',
      element: (library: any) => ({ dummy: 1 }),
      source: 'child-shelf.test3',
      target: 'adult-shelf'
    },
    {
      key: 'edge2',
      element: (library: any) => ({ dummy: 1 }),
      source: 'child-shelf.test2',
      target: 'child-shelf.test4'
    }
  ],

  palette: [
  ]
} as DescriptionModel
