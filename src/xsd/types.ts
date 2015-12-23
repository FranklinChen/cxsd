// This file is part of fast-xml, copyright (c) 2015 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import {State} from './State';
import {QName} from './QName';

import {Base, BaseClass, Annotation, Documentation} from './types/Base';
export {Base, BaseClass, Annotation, Documentation};
import {Schema, Root} from './types/Schema';
export {Schema, Root};
import {Element, ElementBase} from './types/Element';
export {Element, ElementBase};
import {Group, Sequence, Choice, All} from './types/Group';
export {Group, Sequence, Choice, All};
import {Attribute, AnyAttribute, AttributeGroup} from './types/Attribute';
export {Attribute, AnyAttribute, AttributeGroup};
import {TypeBase, SimpleType, ComplexType, SimpleContent, ComplexContent} from './types/ComplexType';
export {TypeBase, SimpleType, ComplexType, SimpleContent, ComplexContent};
import {Extension, Restriction} from './types/Extension';
export {Extension, Restriction};
import {Import, Include} from './types/Import';
export {Import, Include};

export class MissingReferenceError extends Error {
	constructor(tag: Base, state: State, type: string, ref: QName) {
		this.name = 'MissingReferenceError';
		this.message = 'Missing ' + type + ': ' + ref.format() + ' on line ' + tag.lineNumber + ' of ' + state.source.url;

		super(this.message);
	}
}