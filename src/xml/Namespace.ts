// This file is part of cxml, copyright (c) 2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import {Type, TypeSpec} from './Type';

export interface ModuleExports {
	[name: string]: any;
	_cxml: [ Namespace ];
}

/** Tuple: module exports object, list of imported type names */
export type ImportSpec = [ ModuleExports, string[] ];

export class Namespace {
	constructor(name: string, importSpecList: ImportSpec[]) {
		this.name = name;
		this.importSpecList = importSpecList;

		// Skip the document type.
		var importOffset = 1;

		for(var importSpec of importSpecList) {
			importOffset += importSpec[1].length;
		}

		this.typeSpecList.length = importOffset;
	}

	addType(spec: TypeSpec) {
		if(this.typeSpecList[0]) this.typeSpecList.push(spec);
		else {
			// First type added after imports is number 0, the document type.
			this.typeSpecList[0] = spec;
		}

		if(spec.safeName) this.exportTypeTbl[spec.safeName] = spec;
	}

	link() {
		// Skip the document type.
		var typeNum = 1;

		for(var importSpec of this.importSpecList) {
			var other = importSpec[0]._cxml[0];

			for(var typeName of importSpec[1]) {
				this.typeSpecList[typeNum++] = other.exportTypeTbl[typeName];
			}
		}

		var typeSpecList = this.typeSpecList;
		var typeCount = typeSpecList.length;

		while(typeNum < typeCount) {
			var typeSpec = typeSpecList[typeNum++];

			if(typeSpec.parentNum) {
				typeSpec.setParent(typeSpecList[typeSpec.parentNum]);
			}
		}
	}

	name: string;
	importSpecList: ImportSpec[];
	exportTypeNameList: string[];
	typeSpecList: TypeSpec[] = [];

	exportTypeTbl: { [name: string]: TypeSpec } = {};
}