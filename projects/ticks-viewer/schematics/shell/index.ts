import {chain, noop, Rule, Tree } from '@angular-devkit/schematics';
import { strings, normalize, experimental } from '@angular-devkit/core';
import {Schema} from './schema';
import { addPackageToPackageJson } from '../utils/package';
import { getWorkspace, getProjectFromWorkspace } from '../utils/devkit-utils/config';
import { addModuleImportToRootModule } from '../utils/ast';


export function ngAdd(options: Schema): Rule {
  return chain([
    options && options.skipPackageJson ? noop() : addToPackageJson(),
    addTickViewerRootConfig(options)
  ]);
}

function addToPackageJson() {
  return (host: Tree) => { 
    addPackageToPackageJson(host, 'dependencies', 'ticks-viewer', '*');
    return host;
  };
}

function addTickViewerRootConfig(options: Schema) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    addModuleImportToRootModule(
      host,
      'TicksViewerModule',
      'ticks-viewer',
      project);

    return host;
  };
}


