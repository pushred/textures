import test from 'ava';
import {select} from 'd3-selection';
import textures from '../src/main';
import jsdom from './jsdom';

const template = () => {
	const texture = textures.circles();
	const document = jsdom('<svg></svg>');
	const svg = select(document).select('svg');
	return {svg, texture};
};

test(
	'svg.call(texture) append a node <defs>',
	t => {
		const {svg, texture} = template();
		svg.call(texture);
		t.true(!svg.select('defs').empty());
	}
);

test(
	'svg.call(texture) append a node <pattern>',
	t => {
		const {svg, texture} = template();
		svg.call(texture);
		t.true(!svg.select('defs').select('pattern').empty());
	}
);

test(
	'svg.call(texture) append a node <pattern> with the id attribute',
	t => {
		const {svg, texture} = template();
		svg.call(texture);
		t.not(svg.select('defs').select('pattern').attr('id'), '');
	}
);

test(
	'svg.call(texture) append a node <pattern> with the patternUnits attribute set to userSpaceOnUse',
	t => {
		const {svg, texture} = template();
		svg.call(texture);
		t.is(svg.select('defs').select('pattern').attr('patternUnits'), 'userSpaceOnUse');
	}
);

test(
	'svg.call(texture) append a node <pattern> with the attributes width and height set to 20',
	t => {
		const {svg, texture} = template();
		svg.call(texture);
		t.is(svg.select('defs').select('pattern').attr('width'), '20');
		t.is(svg.select('defs').select('pattern').attr('height'), '20');
	}
);

test(
	'texture.circles() append a node <circle> with some default attributes',
	t => {
		const {svg, texture} = template();
		svg.call(texture);
		const circle = svg.select('defs').select('pattern').select('circle');
		t.is(circle.attr('fill'), '#343434');
		t.is(circle.attr('stroke'), '#343434');
		t.is(circle.attr('strokeWidth'), null);
		t.is(circle.attr('r'), '2');
		t.is(circle.attr('cx'), '10');
		t.is(circle.attr('cy'), '10');
	}
);

test(
	'texture.heavier() doubles the radius',
	t => {
		const {svg, texture} = template();
		texture.heavier();
		svg.call(texture);
		t.is(svg.select('defs').select('pattern').select('circle').attr('r'), '4');
	}
);

test(
	'texture.heavier(3) changes radius to radius * 2 * 3',
	t => {
		const {svg, texture} = template();
		texture.heavier(3);
		svg.call(texture);
		t.is(svg.select('defs').select('pattern').select('circle').attr('r'), '12');
	}
);

test(
	'texture.lighter() divides the radius by 2',
	t => {
		const {svg, texture} = template();
		texture.lighter();
		svg.call(texture);
		t.is(svg.select('defs').select('pattern').select('circle').attr('r'), '1');
	}
);

test(
	'texture.lighter(2) changes radius to radius / (2 * 2)',
	t => {
		const {svg, texture} = template();
		texture.lighter(2);
		svg.call(texture);
		t.is(svg.select('defs').select('pattern').select('circle').attr('r'), '0.5');
	}
);

test(
	'texture.thinner() doubles the size',
	t => {
		const {svg, texture} = template();
		texture.thinner();
		svg.call(texture);
		t.is(svg.select('defs').select('pattern').attr('width'), '40');
	}
);

test(
	'texture.thinner(3) changes size to size * 2 * 3',
	t => {
		const {svg, texture} = template();
		texture.thinner(3);
		svg.call(texture);
		t.is(svg.select('defs').select('pattern').attr('width'), '120');
	}
);

test(
	'texture.thicker() divides the size by 2',
	t => {
		const {svg, texture} = template();
		texture.thicker();
		svg.call(texture);
		t.is(svg.select('defs').select('pattern').attr('width'), '10');
	}
);

test(
	'texture.thicker(2) changes size to size / (2 * 2)',
	t => {
		const {svg, texture} = template();
		texture.thicker(2);
		svg.call(texture);
		t.is(svg.select('defs').select('pattern').attr('width'), '5');
	}
);

test(
	'texture.background("firebrick") append a node <rect> with attribute fill equal to "firebrick"',
	t => {
		const {svg, texture} = template();
		texture.background('firebrick');
		svg.call(texture);
		t.is(svg.select('defs').select('pattern').select('rect').attr('fill'), 'firebrick');
	}
);

test(
	'texture.size(40) set size to 40',
	t => {
		const {svg, texture} = template();
		texture.size(40);
		svg.call(texture);
		const circle = svg.select('defs').select('pattern').select('circle');
		t.is(circle.attr('cx'), '20');
		t.is(circle.attr('cy'), '20');
	}
);

test(
	'texture.complement() append 4 more nodes <circles>',
	t => {
		const {svg, texture} = template();
		texture.complement();
		svg.call(texture);
		t.is(svg.select('defs').select('pattern').selectAll('circle').size(), 5);
	}
);

test(
	'texture.radius(5) set radius to 5',
	t => {
		const {svg, texture} = template();
		texture.radius(5);
		svg.call(texture);
		const circle = svg.select('defs').select('pattern').select('circle');
		t.is(circle.attr('r'), '5');
	}
);

test(
	'texture.fill("red") set fill to red',
	t => {
		const {svg, texture} = template();
		texture.fill('red');
		svg.call(texture);
		const circle = svg.select('defs').select('pattern').select('circle');
		t.is(circle.attr('fill'), 'red');
	}
);

test(
	'texture.stroke("red") set stroke to red',
	t => {
		const {svg, texture} = template();
		texture.stroke('red');
		svg.call(texture);
		const circle = svg.select('defs').select('pattern').select('circle');
		t.is(circle.attr('stroke'), 'red');
	}
);

test(
	'texture.strokeWidth(2) set stroke-width to 2',
	t => {
		const {svg, texture} = template();
		texture.strokeWidth(2);
		svg.call(texture);
		const circle = svg.select('defs').select('pattern').select('circle');
		t.is(circle.attr('stroke-width'), '2');
	}
);

test(
	'texture.id("xyz") set pattern id to xyz',
	t => {
		const {svg, texture} = template();
		texture.id('xyz');
		svg.call(texture);
		t.is(svg.select('defs').select('pattern').attr('id'), 'xyz');
	}
);

test(
	'texture.url() returns a string with the pattern id',
	t => {
		const {svg, texture} = template();
		texture.id('xyz');
		svg.call(texture);
		t.is(texture.url(), 'url(#xyz)');
	}
);

test(
	'texture.size(30).radius(5) set size to 30 and radius to 5',
	t => {
		const {svg, texture} = template();
		texture.size(30).radius(5);
		svg.call(texture);
		const circle = svg.select('defs').select('pattern').select('circle');
		t.is(circle.attr('r'), '5');
		t.is(circle.attr('cx'), '15');
	}
);
