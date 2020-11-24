require('../resources/diagram-js.css')
require('../resources/tools.css')

import library from './library'
import descriptionModel from './description'

import * as _ from 'lodash'

import Diagram from 'diagram-js'

import ConnectModule from 'diagram-js/lib/features/connect'
import ContextPadModule from 'diagram-js/lib/features/context-pad'
import CreateModule from 'diagram-js/lib/features/create'
import LassoToolModule from 'diagram-js/lib/features/lasso-tool'
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas'
import MoveModule from 'diagram-js/lib/features/move'
import OutlineModule from 'diagram-js/lib/features/outline'
import PaletteModule from 'diagram-js/lib/features/palette'
import RulesModule from 'diagram-js/lib/features/rules'
import SelectionModule from 'diagram-js/lib/features/selection'
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll'

import DescriptionModule from 'diagram-mapper/dist/description/Module'
import RepresentationModule from 'diagram-mapper/dist/representation/Module'
import UpdateModule from 'diagram-mapper/dist/update/Module'
import RendererModule from 'diagram-mapper/dist/draw/Module'
import DescribedPaletteModule from 'diagram-mapper/dist/palette/Module'
import LayoutModule from 'diagram-mapper/dist//layout/Module'
import ModelingModule from 'diagram-mapper/dist/modeling/Module'
import ResizeModule from 'diagram-mapper/dist/resize/Module'
import AutoResizeModule from 'diagram-mapper/dist/auto-resize/Module'

import Description from 'diagram-mapper/dist/description/Description'
import Updater from 'diagram-mapper/dist/update/Updater'

var container = document.querySelector('#container')

var diagram = new Diagram({
  canvas: {
    container: container
  },
  modules: [
    ConnectModule,
    ContextPadModule,
    CreateModule,
    LassoToolModule,
    MoveCanvasModule,
    MoveModule,
    OutlineModule,
    PaletteModule,
    RulesModule,
    SelectionModule,
    ZoomScrollModule,

    DescriptionModule,
    RepresentationModule,
    UpdateModule,
    RendererModule,
    DescribedPaletteModule,
    ModelingModule,
    ResizeModule,
    AutoResizeModule,
    LayoutModule
  ]
})

const description = diagram.get('description') as Description
description.describe(descriptionModel)

const manager = diagram.get('updater') as Updater
manager.updateRepresentation(library, true, true)
