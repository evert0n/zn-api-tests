/**
 * Test all endpoints with error 400 invalid_request
 *
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
      'get',
      //'post', 400 invalid_client
      'put',
      'delete'
    ]
  },
  {
    path: '/users/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/users/1/authorizations',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/users/1/authorizations/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/users/1/clients',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/users/1/clients/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/users/1/task_preferences',
    verbs: [
      'get',
      //'post', 404
      'put',
      //'delete' 404
    ]
  },
  {
    path: '/users/1/task_preferences/1',
    verbs: [
      //'get', 404
      //'post', 404
      //'put', 404
      //'delete' 404
    ]
  },
  {
    path: '/users/1/avatar',
    verbs: [
      //'get', 404
      'post',
      //'put', 404
      'delete'
    ]
  },
  {
    path: '/users/1/avatar/1',
    verbs: [
      //'get', 404
      //'post', 404
      //'put', 404
      //'delete' 404
    ]
  },
  {
    path: '/workspaces',
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
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/workspaces/1/roles',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/workspaces/1/roles/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/workspaces/1/invitees',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/workspaces/1/invitees/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/workspaces/1/members',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/workspaces/1/members/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/workspaces/1/members/1/task_preferences',
    verbs: [
      'get',
      //'post', 404
      'put',
      //'delete' 404
    ]
  },
  {
    path: '/workspaces/1/members/1/task_preferences/1',
    verbs: [
      //'get', 404
      //'post', 404
      //'put', 404
      //'delete' 404
    ]
  },
  {
    path: '/workspaces/1/logo',
    verbs: [
      //'get', 404
      'post',
      //'put', 404
      'delete'
    ]
  },
  {
    path: '/workspaces/1/transfer_requests',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/workspaces/1/transfer_requests/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/workspace_copy_jobs',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/workspace_copy_jobs/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/forms',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/forms/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/forms/1/fields',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/forms/1/fields/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/forms/1/records',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/forms/1/records/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/forms/1/records/permissions',
    verbs: [
      'get',
      //'post', 404
      'put',
      //'delete' 404
    ]
  },
  {
    path: '/forms/1/records/permissions/1',
    verbs: [
      //'get', 404
      //'post', 404
      //'put', 404
      //'delete' 404
    ]
  },
  {
    path: '/forms/records/permissions',
    verbs: [
      'get',
      //'post', 404
      'put',
      //'delete' 404
    ]
  },
  {
    path: '/forms/records/permissions/1',
    verbs: [
      //'get', 404
      //'post', 404
      //'put', 404
      //'delete' 404
    ]
  },
  {
    path: '/forms/permissions',
    verbs: [
      'get',
      //'post', 404
      'put',
      //'delete' 404
    ]
  },
  {
    path: '/forms/permissions/1',
    verbs: [
      //'get', 404
      //'post', 404
      //'put', 404
      //'delete' 404
    ]
  },
  {
    path: '/forms/1/folders',
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
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/forms/1/uploads',
    verbs: [
      //'get', 404
      //'post', 400 invalid_client
      //'put', 404
      //'delete' 404
    ]
  },
  {
    path: '/forms/1/uploads/1',
    verbs: [
      //'get', 404
      //'post', 404
      //'put', 404
      //'delete' 404
    ]
  },
  {
    path: '/form_field_taxonomy',
    verbs: [
      //'get', 400 invalid_client
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/form_field_taxonomy/1',
    verbs: [
      //'get', 400 invalid_client
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/form_terminology_taxonomy',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/form_terminology_taxonomy/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/record_import_jobs',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/record_import_jobs/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/record_import_files',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/record_import_files/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/record_export_jobs',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/record_export_jobs/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/subscriptions',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/subscriptions/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/users/1/notifications',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/users/1/notifications/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/users/1/notification_email',
    verbs: [
      'get',
      //'post', 404
      'put',
      //'delete' 404
    ]
  },
  {
    path: '/users/1/notification_email/1',
    verbs: [
      //'get', 404
      //'post', 404
      //'put', 404
      //'delete' 404
    ]
  },
  {
    path: '/tasks',
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
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/task_lists',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/task_lists/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/task_priorities',
    verbs: [
      //'get', 400 invalid client
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/task_priorities/1',
    verbs: [
      //'get', 400 invalid client
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/task_statuses',
    verbs: [
      //'get', 400 invalid client
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/task_statuses/1',
    verbs: [
      //'get', 400 invalid client
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/events',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/events/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/files',
    verbs: [
      'get',
      //'post', 400 invalid_client
      'put',
      'delete'
    ]
  },
  {
    path: '/files/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/notes',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/notes/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/notes/1/replies',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/notes/1/replies/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/activities',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/activities/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/data_views',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/data_views/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/calculation_settings',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/calculation_settings/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/calculate',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/calculate/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/app_templates',
    verbs: [
      //'get', 400 invalid_client
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/app_templates/1',
    verbs: [
      //'get', 400 invalid_client
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/app_template_categories',
    verbs: [
      //'get', 400 invalid_client
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/app_template_categories/1',
    verbs: [
      //'get', 400 invalid_client
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/app_template_install_jobs',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/app_template_install_jobs/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/plugins',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/plugins',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/plugins/1/services',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/plugins/1/services/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/plugins/1/services/1/uploads',
    verbs: [
      //'get', 404
      'post',
      //'put', 404
      //'delete' 404
    ]
  },
  {
    path: '/plugins/1/services/1/uploads/1',
    verbs: [
      //'get', 404
      //'post', 404
      //'put', 404
      //'delete' 404
    ]
  },
  {
    path: '/plugins/1/screenshots',
    verbs: [
      //'get', 404
      'post',
      //'put', 404
      //'delete' 404
    ]
  },
  {
    path: '/plugins/1/screenshots/1',
    verbs: [
      //'get', 404
      //'post', 404
      //'put', 404
      //'delete' 404
    ]
  },
  {
    path: '/workspace_plugin_links',
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
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/webhooks',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/webhooks/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/scheduled_webhooks',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/scheduled_webhooks/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/webhook_events',
    verbs: [
      'get',
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/webhook_events/1',
    verbs: [
      'get',
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/countries',
    verbs: [
      //'get', 400 invalid_client
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/countries/1',
    verbs: [
      //'get', 400 invalid_client
      //'post', 404
      'put',
      'delete'
    ]
  },
  {
    path: '/states',
    verbs: [
      //'get', 400 invalid_client
      'post',
      'put',
      'delete'
    ]
  },
  {
    path: '/states/1',
    verbs: [
      //'get', 400 invalid_client
      //'post', 404
      'put',
      'delete'
    ]
  },

]

endpoints.forEach(endpoint => {

  endpoint.verbs.forEach(verb => {

    test(`${verb} ${endpoint.path} should respond with 400 (invalid_request)`, async t => {

      const res = await api[verb](endpoint.path);

      let error = {
        "error": "invalid_request",
        "error_description": "The access token was not found"
      }

      t.is(res.status, 400);
      t.same(res.body, error);

    });

  });

});
