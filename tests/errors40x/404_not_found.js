/**
 * Test all endpoints with error 404 not_found
 *
 *
 */
var test = require('ava');
var supertest = require('supertest-as-promised');
var config = require('../../config');

const api = supertest(config.api.url);

const endpoints = [
  {
    path: '/users/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/users/1/authorizations/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/users/1/clients/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/users/1/task_preferences',
    verbs: [
      'post',
      'delete'
    ]
  },
  {
    path: '/users/1/task_preferences/1',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/users/1/avatar',
    verbs: [
      'get',
      'put',
    ]
  },
  {
    path: '/users/1/avatar/1',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/workspaces/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/workspaces/1/roles/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/workspaces/1/invitees/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/workspaces/1/members/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/workspaces/1/members/1/task_preferences',
    verbs: [
      'post',
      'delete'
    ]
  },
  {
    path: '/workspaces/1/members/1/task_preferences/1',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/workspaces/1/logo',
    verbs: [
      'get',
      'put',
    ]
  },
  {
    path: '/workspaces/1/transfer_requests/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/workspace_copy_jobs/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/forms/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/forms/1/fields/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/forms/1/records/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/forms/1/records/permissions',
    verbs: [
      'post',
      'delete'
    ]
  },
  {
    path: '/forms/1/records/permissions/1',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/forms/records/permissions',
    verbs: [
      'post',
      'delete'
    ]
  },
  {
    path: '/forms/records/permissions/1',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/forms/permissions',
    verbs: [
      'post',
      'delete'
    ]
  },
  {
    path: '/forms/permissions/1',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/forms/1/folders/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/forms/1/uploads',
    verbs: [
      'get',
      //'post', 400 invalid_client
      'put',
      'delete'
    ]
  },
  {
    path: '/forms/1/uploads/1',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/form_field_taxonomy/1',
    verbs: [
      //'get', 400 invalid_client
      'post',
    ]
  },
  {
    path: '/form_terminology_taxonomy/1',
    verbs: [
      //'get', 400 invalid_client
      'post',
    ]
  },
  {
    path: '/record_import_jobs/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/record_import_files/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/record_export_jobs/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/subscriptions/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/users/1/notifications/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/users/1/notification_email',
    verbs: [
      'post',
      'delete'
    ]
  },
  {
    path: '/users/1/notification_email/1',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/tasks/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/task_lists/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/task_priorities',
    verbs: [
      //'get', 400 invalid client
    ]
  },
  {
    path: '/task_priorities/1',
    verbs: [
      //'get', 400 invalid client
      'post',
    ]
  },
  {
    path: '/task_statuses',
    verbs: [
      //'get', 400 invalid client
    ]
  },
  {
    path: '/task_statuses/1',
    verbs: [
      //'get', 400 invalid client
      'post',
    ]
  },
  {
    path: '/events/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/files',
    verbs: [
      //'post', 400 invalid_client
    ]
  },
  {
    path: '/files/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/notes/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/notes/1/replies/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/activities/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/data_views/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/calculation_settings/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/calculate/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/app_templates',
    verbs: [
      //'get', 400 invalid_client
    ]
  },
  {
    path: '/app_templates/1',
    verbs: [
      //'get', 400 invalid_client
      'post',
    ]
  },
  {
    path: '/app_template_categories',
    verbs: [
      //'get', 400 invalid_client
    ]
  },
  {
    path: '/app_template_categories/1',
    verbs: [
      //'get', 400 invalid_client
      'post',
    ]
  },
  {
    path: '/app_template_install_jobs/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/plugins/1/services/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/plugins/1/services/1/uploads',
    verbs: [
      'get',
      'put',
      'delete'
    ]
  },
  {
    path: '/plugins/1/services/1/uploads/1',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/plugins/1/screenshots',
    verbs: [
      'get',
      'put',
      'delete'
    ]
  },
  {
    path: '/plugins/1/screenshots/1',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/workspace_plugin_links/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/webhooks/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/scheduled_webhooks/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/webhook_events/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/countries/1',
    verbs: [
      'post',
    ]
  },
  {
    path: '/states/1',
    verbs: [
      'post',
    ]
  },

]

endpoints.forEach(endpoint => {

  endpoint.verbs.forEach(verb => {

    test(`${verb} ${endpoint.path} should respond with 404`, async t => {

      const res = await api[verb](endpoint.path);

      let error = {
        "status": 404,
        "code": 5004,
        "userMessage": "Not Found",
        "developerMessage": "Not Found"
      }

      if (config.api.debug) {
        error.systemMessage = ["Controller class Controller could not be found."];
      }

      t.is(res.status, 404);
      t.same(res.body, error);

    });

  });

});
