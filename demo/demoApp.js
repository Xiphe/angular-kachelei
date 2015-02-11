/* global angular */
angular.module('demoApp', ['kachelei']).run(function($rootScope) {
  'use strict';

  $rootScope.things = [
    {
      headline: 'Lorem',
      x: 2,
      y: 1
    },
    {
      headline: 'Dolor',
      x: 4,
      y: 2
    },
    {
      headline: 'Sit',
      x: 1,
      y: 2
    },
    {
      headline: 'Ipsum',
      x: 2,
      y: 1
    },
    {
      headline: 'Amed',
      x: 1,
      y: 2
    },
    {
      headline: 'Foo',
      x: 2,
      y: 2
    },
    {
      headline: 'Bar',
      x: 2,
      y: 1
    },
    {
      headline: 'Baz',
      x: 1,
      y: 2
    }
  ];


}).constant('kachelConfig', {
  ratio: 1,
  maxWidth: 250,
  gap: 20
});
