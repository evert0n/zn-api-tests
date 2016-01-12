/**
 * Test all endpoints with error 400 invalid_request
 *
 */
var test = require('ava');
var supertest = require('supertest-as-promised');
var config = require('../../config');

const api = supertest(config.api.url);

const endpoints = [
  {
    path: '/users',
    verbs: [
      'post',
    ]
  },
  {
    path: '/forms/1/uploads',
    verbs: [
      'post',
    ]
  },
  {
    path: '/form_field_taxonomy',
    verbs: [
      'get',
    ]
  },
  {
    path: '/form_field_taxonomy/1',
    verbs: [
      'get',
    ]
  },
  {
    path: '/task_priorities',
    verbs: [
      'get',
    ]
  },
  {
    path: '/task_priorities/1',
    verbs: [
      'get',
    ]
  },
  {
    path: '/task_statuses',
    verbs: [
      'get',
    ]
  },
  {
    path: '/task_statuses/1',
    verbs: [
      'get',
    ]
  },
  {
    path: '/files',
    verbs: [
      'post',
    ]
  },
  {
    path: '/app_templates',
    verbs: [
      'get',
    ]
  },
  {
    path: '/app_templates/1',
    verbs: [
      'get',
    ]
  },
  {
    path: '/app_template_categories',
    verbs: [
      'get',
    ]
  },
  {
    path: '/app_template_categories/1',
    verbs: [
      'get',
    ]
  },
  {
    path: '/countries',
    verbs: [
      'get',
    ]
  },
  {
    path: '/countries/1',
    verbs: [
      'get',
    ]
  },
  {
    path: '/states',
    verbs: [
      'get',
    ]
  },
  {
    path: '/states/1',
    verbs: [
      'get',
    ]
  },

]

endpoints.forEach(endpoint => {

  endpoint.verbs.forEach(verb => {

    test(`${verb} ${endpoint.path} should respond with 400 (invalid_client)`, async t => {

      const res = await api[verb](endpoint.path);

      let error = {
        "error": "invalid_client",
        "error_description": "Client credentials were not found in the headers or body"
      }

      t.is(res.status, 400);
      t.same(res.body, error);

    });

  });

});
