/**
 * Test all endpoints for CORS headers and options request
 *
 *
 */
var test = require('ava');
var supertest = require('supertest-as-promised');
var config = require('../config');

const api = supertest(config.api.url);

const endpoints = [
  '/activities',
  '/activities/1',
  '/app_template_categories',
  '/app_template_categories/1',
  '/app_template_install_jobs',
  '/app_template_install_jobs/1',
  '/app_templates',
  '/app_templates/1',
  '/calculate',
  '/calculate/1',
  '/calculation_settings',
  '/calculation_settings/1',
  '/countries',
  '/countries/1',
  '/data_views',
  '/data_views/1',
  '/events',
  '/events/1',
  '/files',
  '/files/1',
  '/form_field_taxonomy',
  '/form_field_taxonomy/1',
  '/form_terminology_taxonomy',
  '/form_terminology_taxonomy/1',
  '/forms',
  '/forms/1',
  '/forms/1/fields',
  '/forms/1/fields/1',
  '/forms/1/folders',
  '/forms/1/folders/1',
  '/forms/1/records',
  '/forms/1/records/1',
  '/forms/1/records/permissions',
  '/forms/1/records/permissions/1',
  '/forms/1/uploads',
  '/forms/1/uploads/1',
  '/forms/permissions',
  '/forms/permissions/1',
  '/forms/records/permissions',
  '/forms/records/permissions/1',
  '/notes',
  '/notes/1',
  '/notes/1/replies',
  '/notes/1/replies/1',
  '/plugins',
  '/plugins',
  '/plugins/1/screenshots',
  '/plugins/1/screenshots/1',
  '/plugins/1/services',
  '/plugins/1/services/1',
  '/plugins/1/services/1/uploads',
  '/plugins/1/services/1/uploads/1',
  '/record_export_jobs',
  '/record_export_jobs/1',
  '/record_import_files',
  '/record_import_files/1',
  '/record_import_jobs',
  '/record_import_jobs/1',
  '/scheduled_webhooks',
  '/scheduled_webhooks/1',
  '/states',
  '/states/1',
  '/subscriptions',
  '/subscriptions/1',
  '/task_lists',
  '/task_lists/1',
  '/task_priorities',
  '/task_priorities/1',
  '/task_statuses',
  '/task_statuses/1',
  '/tasks',
  '/tasks/1',
  '/users',
  '/users/1',
  '/users/1/authorizations',
  '/users/1/authorizations/1',
  '/users/1/avatar',
  '/users/1/avatar/1',
  '/users/1/clients',
  '/users/1/clients/1',
  '/users/1/notification_email',
  '/users/1/notification_email/1',
  '/users/1/notifications',
  '/users/1/notifications/1',
  '/users/1/task_preferences',
  '/users/1/task_preferences/1',
  '/webhook_events',
  '/webhook_events/1',
  '/webhooks',
  '/webhooks/1',
  '/workspace_copy_jobs',
  '/workspace_copy_jobs/1',
  '/workspace_plugin_links',
  '/workspace_plugin_links/1',
  '/workspaces',
  '/workspaces/1',
  '/workspaces/1/invitees',
  '/workspaces/1/invitees/1',
  '/workspaces/1/logo',
  '/workspaces/1/members',
  '/workspaces/1/members/1',
  '/workspaces/1/members/1/task_preferences',
  '/workspaces/1/members/1/task_preferences/1',
  '/workspaces/1/roles',
  '/workspaces/1/roles/1',
  '/workspaces/1/transfer_requests',
  '/workspaces/1/transfer_requests/1'
]

const verbs = ['options', 'get', 'post', 'put', 'delete'];

endpoints.forEach(endpoint => {

  verbs.forEach(verb => {

    test(`${verb} ${endpoint} should have cors headers`, async t => {

      const res = await api[verb](endpoint);

      t.is(res.headers['access-control-allow-methods'], 'GET, POST, PUT, DELETE, OPTIONS');
      t.is(res.headers['access-control-allow-origin'], '*');

    });

  });

});

