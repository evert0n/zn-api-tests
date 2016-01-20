/**
 * https://wizehive.atlassian.net/browse/WIZ-5847
 *
 * endpoints affected:
 *
 * /users/{user.id}/authorizations
 * /users/{user.id}/clients
 * /users/{user.id}/avatar
 * /users/{user.id}/notifications
 * /users/{user.id}/notification_email
 *
 * /workspaces/{workspace.id}/roles
 * /workspaces/{workspace.id}/invitees
 * /workspaces/{workspace.id}/members
 * /workspaces/{workspace.id}/logo
 * /workspaces/{workspace.id}/transfer_requests
 *
 * /forms/{form.id}/fields
 * /forms/{form.id}/records
 * /forms/{form.id}/records/permissions
 * /forms/{form.id}/folders
 * /forms/{form.id}/uploads - only post
 *
 * /notes/{note.id}/replies
 *
 * /plugins/{plugin.id}/services
 * /plugins/{plugin.id}/services/{service.id}/uploads
 * /plugins/{plugin.id}/screenshots
 *
 */

var test = require('ava');
var supertest = require('supertest-as-promised');
var config = require('../../config');

const api = supertest(config.api.url);
const access_token = config.api.accessToken;

let workspace = {};
let workspace2 = {};
let form = {};
let form2 = {};
let records = [];
let plugin = {};

test.before('create test workspace', async t => {

  workspace = await api.post('/workspaces')
    .send({name: 'Test wiz-5847 #1'})
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

  workspace2 = await api.post('/workspaces')
    .send({name: 'Test wiz-5847 #2'})
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

  form = await api.post('/forms')
    .send({name: 'F1', workspace: { id: workspace.id}})
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

  form2 = await api.post('/forms')
    .send({name: 'F2', workspace: { id: workspace.id}})
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

  let fieldsData = [];

  for (let i=0; i<10; i++) {
    fieldsData.push({label: 'F'+i, type:'text-input'});
  }

  await api.post('/forms/' + form.id + '/fields')
    .send(fieldsData)
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

  await api.post('/forms/' + form2.id + '/fields')
    .send(fieldsData)
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

  form = await api.get('/forms/' + form.id)
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

  form2 = await api.get('/forms/' + form2.id)
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

  let recordsData = [];
  let recordsData2 = [];

  for (let i=0; i<10; i++) {
    let r = {};
    let r2 = {};
    form.fields.forEach(f => {
      r['field'+f.id] = 'R' + i + 'F' + f.id;
    });
    recordsData.push(r);
    form2.fields.forEach(f => {
      r2['field'+f.id] = 'R' + i + 'F' + f.id;
    });
    recordsData2.push(r2);
  }

  await api.post('/forms/' + form.id + '/records')
    .send(recordsData)
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

  await api.post('/forms/' + form2.id + '/records')
    .send(recordsData2)
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

  records = await api.get('/forms/' + form.id + '/records')
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

  // let sufix = new Date().getTime();

  // plugin = await api.post('/plugins')
  //   .set('Authorization', 'Bearer ' + access_token)
  //   .send({namespace:'test' + sufix, name:'P' + sufix, privacy:'private'})
  //   .expect(200)
  //   .then(res => res.body.data);

  // plugin.service = await api.post('/plugins/' + plugin.id + '/services')
  //   .set('Authorization', 'Bearer ' + access_token)
  //   .send({route:'/test'})
  //   .expect(200)
  //   .then(res => res.body.data);

});

const users = [
  'authorizations',
  'clients',
  'notifications'
]

// Users

users.forEach(endpoint => {

  test(`should be 200 get /users/0/${endpoint} but no results`, async t => {

      let results = await api.get('/users/0/' + endpoint)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200)
        .then(res => res.body);

      t.is(results.totalCount, 0);

  });

});

// User Notification Email

test('should be 404 get /users/0/notification_email', async t => {

    let results = await api.get('/users/0/notification_email')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(404)
      .then(res => res.body);

    t.is(results.code, 4004);

});

test('should be 403 put /users/0/notification_email', async t => {

    let results = await api.put('/users/0/notification_email')
      .send({frequency: 'daily'})
      .set('Authorization', 'Bearer ' + access_token)
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 4013);

});

// Workspace Roles

test('should be 200 get /workspaces/0/roles but no results', async t => {

    let results = await api.get('/workspaces/0/roles')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(200)
      .then(res => res.body);

    t.is(results.totalCount, 0);

});

test('should be 404 get /workspaces/0/roles/1', async t => {

    let results = await api.get('/workspaces/0/roles/1')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(404)
      .then(res => res.body);

    t.is(results.totalCount, 0);

});

test('should be 403 post /workspaces/0/roles', async t => {

    let results = await api.post('/workspaces/0/roles')
      .set('Authorization', 'Bearer ' + access_token)
      .send({name: 'Test Role'})
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 4012);

});

// TODO: bug should be 403 but current 200
test('should be 40x post /workspaces/0/roles/{role.id} (BUG: status code is 200)', async t => {

    let role = await api.post('/workspaces/' + workspace.id + '/roles')
      .set('Authorization', 'Bearer ' + access_token)
      .send({name: 'Test Role'})
      .expect(200)
      .then(res => res.body.data);

    let results = await api.put('/workspaces/0/roles/' + role.id)
      .set('Authorization', 'Bearer ' + access_token)
      .send({name: 'Test Role'})
      .expect(200)
      .then(res => res.body);

    t.is(results.userMessage, 'Error saving data');

});

test('should be 403 delete /workspaces/0/roles/{role.id}', async t => {

    let role = await api.post('/workspaces/' + workspace.id + '/roles')
      .set('Authorization', 'Bearer ' + access_token)
      .send({name: 'Test Role'})
      .expect(200)
      .then(res => res.body.data);

    let results = await api.delete('/workspaces/0/roles/' + role.id)
      .set('Authorization', 'Bearer ' + access_token)
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 4000);

});

// Workspace Invitees

test('should be 200 get /workspaces/0/invitees but no results', async t => {

    let results = await api.get('/workspaces/0/invitees')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(200)
      .then(res => res.body);

    t.is(results.totalCount, 0);

});

test('should be 403 post /workspaces/0/invitees', async t => {

    let results = await api.post('/workspaces/0/invitees')
      .set('Authorization', 'Bearer ' + access_token)
      .send({role:{id:2}})
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 4013);

});

test('should be 404 get /workspaces/0/invitees/{invite.id}', async t => {

    let invite = await api.post('/workspaces/' + workspace.id + '/invitees')
      .set('Authorization', 'Bearer ' + access_token)
      .send({role:{id:2}})
      .expect(200)
      .then(res => res.body.data);

    let results = await api.get('/workspaces/0/invitees/' + invite.id)
      .set('Authorization', 'Bearer ' + access_token)
      .expect(404)
      .then(res => res.body);

    t.is(results.code, 4004);

});

// TODO: bug should be 403 but current 200
test('should be 40x put /workspaces/0/invitees/{invite.id} (BUG: status code 200)', async t => {

    let invite = await api.post('/workspaces/' + workspace.id + '/invitees')
      .set('Authorization', 'Bearer ' + access_token)
      .send({role:{id:2}})
      .expect(200)
      .then(res => res.body.data);

    let results = await api.put('/workspaces/0/invitees/' + invite.id)
      .set('Authorization', 'Bearer ' + access_token)
      .send({email:'test+invite@wizehive.com'})
      .expect(200)
      .then(res => res.body);

    t.is(results.userMessage, 'Error saving data');

});

test('should be 403 delete /workspaces/0/invitees/{invite.id}', async t => {

    let invite = await api.post('/workspaces/' + workspace.id + '/invitees')
      .set('Authorization', 'Bearer ' + access_token)
      .send({role:{id:2}})
      .expect(200)
      .then(res => res.body.data);

    let results = await api.delete('/workspaces/0/invitees/' + invite.id)
      .set('Authorization', 'Bearer ' + access_token)
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 4000);

});

test('should be 200 get /workspaces/0/members but no results', async t => {

    let results = await api.get('/workspaces/0/members')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(200)
      .then(res => res.body);

    t.is(results.totalCount, 0);

});

test('should be 403 post /workspaces/0/members', async t => {

    let results = await api.post('/workspaces/0/members')
      .set('Authorization', 'Bearer ' + access_token)
      .send({inviteCode:1234})
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 4012);

});

// TODO: /workspaces/{workspaceid}/members/{member.id}

// TODO: /workspaces/{workspace.id}/logo

test('should be 200 get /workspaces/0/transfer_requests but no results', async t => {

    let results = await api.get('/workspaces/0/transfer_requests')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(200)
      .then(res => res.body);

    t.is(results.totalCount, 0);

});

test('should be 403 post /workspaces/0/transfer_requests', async t => {

    let results = await api.post('/workspaces/0/transfer_requests')
      .set('Authorization', 'Bearer ' + access_token)
      .send({inviteCode:1234})
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 4012);

});

let transferRequest = {};

test('should be 404 get /workspaces/0/transfer_requests/{transfer_request.id}', async t => {

    let transferRequest = await api.post('/workspaces/' + workspace.id + '/transfer_requests')
      .set('Authorization', 'Bearer ' + access_token)
      .send({transferToEmail:'test+transfer-request@wizehive.com'})
      .expect(200)
      .then(res => res.body.data);

    let results = await api.get('/workspaces/0/transfer_requests/' + transferRequest.id)
      .set('Authorization', 'Bearer ' + access_token)
      .expect(404)
      .then(res => res.body);

    t.is(results.code, 4004);

});

test('should be 404 put /workspaces/0/transfer_requests/{transfer_request.id}', async t => {

    let results = await api.put('/workspaces/0/transfer_requests/' + transferRequest.id)
      .set('Authorization', 'Bearer ' + access_token)
      .send({transferToEmail:'test+transfer-request@wizehive.com'})
      .expect(404)
      .then(res => res.body);

    t.is(results.code, 5004);

});

test('should be 404 delete /workspaces/0/transfer_requests/{transfer_request.id}', async t => {

    let results = await api.delete('/workspaces/0/transfer_requests/' + transferRequest.id)
      .set('Authorization', 'Bearer ' + access_token)
      .expect(404)
      .then(res => res.body);

    t.is(results.code, 5004);

});


// Forms Fields

test('should be 200 get /forms/0/fields but no results', async t => {

    let results = await api.get('/forms/0/fields')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(200)
      .then(res => res.body);

    t.is(results.totalCount, 0);

});

test('should be 403 post /forms/0/fields', async t => {

    let results = await api.post('/forms/0/fields')
      .set('Authorization', 'Bearer ' + access_token)
      .send({label:'Test field'})
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 4012);

});

test('should be 404 get /forms/0/fields/{field.id}', async t => {

    let results = await api.get('/forms/0/fields/' + form.fields[0].id)
      .set('Authorization', 'Bearer ' + access_token)
      .expect(404)
      .then(res => res.body);

    t.is(results.code, 4004);

});

// TODO: bug should be 403 but current 200
test('should be 40x put /forms/0/fields/{field.id} (BUG: status code 200)', async t => {

    let results = await api.put('/forms/0/fields/' + form.fields[0].id)
      .set('Authorization', 'Bearer ' + access_token)
      .send({label:'Test field'})
      .expect(200)
      .then(res => res.body);

    t.is(results.userMessage, 'Error saving data');

});

test('should be 403 delete /forms/0/fields/{field.id}', async t => {

    let results = await api.delete('/forms/0/fields/' + form.fields[0].id)
      .set('Authorization', 'Bearer ' + access_token)
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 4000);

});

// Form Records

test('should be 200 get /forms/0/records but no results', async t => {

    let results = await api.get('/forms/0/records')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(200)
      .then(res => res.body);

    t.is(results.totalCount, 0);

});

test('should be 403 post /forms/0/records', async t => {

    let results = await api.post('/forms/0/records')
      .set('Authorization', 'Bearer ' + access_token)
      .send({name:'Test record'})
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 4013);

});

test('should be 404 get /forms/0/records/{field.id}', async t => {

    let results = await api.get('/forms/0/records/' + records[0].id)
      .set('Authorization', 'Bearer ' + access_token)
      .expect(404)
      .then(res => res.body);

    t.is(results.code, 4004);

});

// TODO: bug should be 403 but current 200
test('should be 40x put /forms/0/records/{field.id}  (BUG: status code 200 with data)', async t => {

    let results = await api.put('/forms/0/records/' + records[0].id)
      .set('Authorization', 'Bearer ' + access_token)
      .send({name:'Test record'})
      .expect(200)
      .then(res => res.body);

    t.is(results.data.id, records[0].id);

});

test('should be 403 delete /forms/0/records/{field.id}', async t => {

    let results = await api.delete('/forms/0/records/' + records[0].id)
      .set('Authorization', 'Bearer ' + access_token)
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 4000);

});

// Form Record Permissions

// TODO: bug it shouldn't return results but current you get all
// record permissions for all workspaces
test('should be 200 get /forms/0/records/permissions but no results (BUG: returns all record permissions for all worksapces)', async t => {

    let results = await api.get('/forms/0/records/permissions')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(200)
      .then(res => res.body);

    t.true(results.totalCount > 0);

});

test('should be 404 post /forms/0/records/permissions', async t => {

    let results = await api.post('/forms/0/records/permissions')
      .set('Authorization', 'Bearer ' + access_token)
      .send({name:'Test record'})
      .expect(404)
      .then(res => res.body);

    t.is(results.code, 5004);

});

test('should be 403 put /forms/0/records/permissions', async t => {

    let results = await api.put('/forms/0/records/permissions')
      .set('Authorization', 'Bearer ' + access_token)
      .send({name:'Test record'})
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 4024);

});

test('should be 404 delete /forms/0/records/permissions', async t => {

    let results = await api.delete('/forms/0/records/permissions')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(404)
      .then(res => res.body);

    t.is(results.code, 5004);

});

// Form Folders

// TODO: bug it shouldn't return results but current a folder
test('should be 200 get /forms/0/folders (BUG: return a folder)', async t => {

    let results = await api.get('/forms/0/folders')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(200)
      .then(res => res.body);

    t.true(results.totalCount === 1);

});

test('should be 403 post /forms/0/folders', async t => {

    let results = await api.post('/forms/0/folders')
      .set('Authorization', 'Bearer ' + access_token)
      .send({name:'Test folder'})
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 4012);
    t.is(results.userMessage, 'Error saving data');

});

// TODO: bug it shouldn't return 200 but a 40x
test('should be 40x get /forms/0/folders/{folder.id} (BUG returns a folder)', async t => {

    let folder = await api.post('/forms/' + form.id + '/folders')
      .set('Authorization', 'Bearer ' + access_token)
      .send({name:'Test folder'})
      .expect(200)
      .then(res => res.body.data);

    let results = await api.get('/forms/0/folders/' + folder.id)
      .set('Authorization', 'Bearer ' + access_token)
      .expect(200)
      .then(res => res.body.data);

    t.is(results.id, 0);
    t.is(results.name, 'Uncategorized');

});

// TODO: bug it shouldn't return 200 but a 40x
test('should be 40x put /forms/0/folders/{folder.id} (BUG: returns a folder)', async t => {

    let folder = await api.post('/forms/' + form.id + '/folders')
      .set('Authorization', 'Bearer ' + access_token)
      .send({name:'Test folder'})
      .expect(200)
      .then(res => res.body.data);

    let results = await api.put('/forms/0/folders/' + folder.id)
      .set('Authorization', 'Bearer ' + access_token)
      .send({name:'Test folder'})
      .expect(200)
      .then(res => res.body.data);

    t.is(results.id, 0);
    t.is(results.name, 'Uncategorized');

});

test('should be 403 delete /forms/0/folders/{folder.id}', async t => {

    let folder = await api.post('/forms/' + form.id + '/folders')
      .set('Authorization', 'Bearer ' + access_token)
      .send({name:'Test folder'})
      .expect(200)
      .then(res => res.body.data);

    let results = await api.delete('/forms/0/folders/' + folder.id)
      .set('Authorization', 'Bearer ' + access_token)
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 4000);

});

// Form Uploads

test('should be 404 get /forms/0/uploads', async t => {

    let results = await api.get('/forms/0/uploads')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(404)
      .then(res => res.body);

    t.is(results.code, 5004);

});

test('should be 404 get /forms/0/uploads/1', async t => {

    let results = await api.get('/forms/0/uploads/1')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(404)
      .then(res => res.body);

    t.is(results.code, 5004);

});

test('should be 404 put /forms/0/uploads/1', async t => {

    let results = await api.put('/forms/0/uploads/1')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(404)
      .then(res => res.body);

    t.is(results.code, 5004);

});

test('should be 404 delete /forms/0/uploads/1', async t => {

    let results = await api.delete('/forms/0/uploads/1')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(404)
      .then(res => res.body);

    t.is(results.code, 5004);

});

test('should be 403 get /forms/0/uploads', async t => {

    let results = await api.post('/forms/0/uploads')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(403)
      .then(res => res.body);

    t.is(results.userMessage, 'Error saving data');

});

// Notes and Replies

test('should be 200 get /notes/0/replies but no results', async t => {

    let results = await api.get('/notes/0/replies')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(200)
      .then(res => res.body);

    t.is(results.totalCount, 0);

});

test('should be 404 get /notes/0/replies/{reply.id}', async t => {

    let note = await api.post('/notes')
      .set('Authorization', 'Bearer ' + access_token)
      .send({workspace:{id:workspace.id},body:'Test note'})
      .expect(200)
      .then(res => res.body.data);

    let reply = await api.post('/notes/' + note.id + '/replies')
      .set('Authorization', 'Bearer ' + access_token)
      .send({body:'Test note'})
      .expect(200)
      .then(res => res.body.data);

    let results = await api.get('/notes/0/replies/' + reply.id)
      .set('Authorization', 'Bearer ' + access_token)
      .expect(404)
      .then(res => res.body);

    t.is(results.code, 4004);

});

test('should be 403 put /notes/0/replies/{reply.id} (NOTE: weird you get a Forbidden user message)', async t => {

    let note = await api.post('/notes')
      .set('Authorization', 'Bearer ' + access_token)
      .send({workspace:{id:workspace.id},body:'Test note'})
      .expect(200)
      .then(res => res.body.data);

    let reply = await api.post('/notes/' + note.id + '/replies')
      .set('Authorization', 'Bearer ' + access_token)
      .send({body:'Test note'})
      .expect(200)
      .then(res => res.body.data);

    let results = await api.put('/notes/0/replies/' + reply.id)
      .set('Authorization', 'Bearer ' + access_token)
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 5003);
    t.is(results.userMessage, 'Forbidden');

});

test('should be 403 delete /notes/0/replies/{reply.id}', async t => {

    let note = await api.post('/notes')
      .set('Authorization', 'Bearer ' + access_token)
      .send({workspace:{id:workspace.id},body:'Test note'})
      .expect(200)
      .then(res => res.body.data);

    let reply = await api.post('/notes/' + note.id + '/replies')
      .set('Authorization', 'Bearer ' + access_token)
      .send({body:'Test note'})
      .expect(200)
      .then(res => res.body.data);

    let results = await api.delete('/notes/0/replies/' + reply.id)
      .set('Authorization', 'Bearer ' + access_token)
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 4000);

});

// Plugin Services

test('should be 200 get /plugins/0/services but no results', async t => {

    let results = await api.get('/plugins/0/services')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(200)
      .then(res => res.body);

    t.is(results.totalCount, 0);

});

test('should be 403 post /plugins/0/services', async t => {

    let results = await api.post('/plugins/0/services')
      .set('Authorization', 'Bearer ' + access_token)
      .send({route: '/testPost'})
      .expect(403)
      .then(res => res.body);

    t.is(results.code, 4013);

});

// test('should be 404 get /plugins/0/services/{service.id}', async t => {

//     let results = await api.get('/plugins/0/services/' + plugin.service.id)
//       .set('Authorization', 'Bearer ' + access_token)
//       .expect(404)
//       .then(res => res.body);

//     t.is(results.code, 4004);

// });

// test('should be 404 post /plugins/0/services/{service.id}', async t => {

//     let results = await api.post('/plugins/0/services/' + plugin.service.id)
//       .set('Authorization', 'Bearer ' + access_token)
//       .send({route:'testPost' + plugin.service.id})
//       .expect(200)
//       .then(res => res.body);

//     t.is(results.userMessage, 'Error saving data');

// });

// TODO: bug return 200
// test('should be 40x put /plugins/0/services/{service.id} (BUG: status code 200)', async t => {

//     let results = await api.put('/plugins/0/services/' + plugin.service.id)
//       .set('Authorization', 'Bearer ' + access_token)
//       .send({route:'testPost' + plugin.service.id})
//       .expect(404)
//       .then(res => res.body);

//     t.is(results.code, 5004);

// });

// test('should be 403 delete /plugins/0/services/{service.id} (NOTE: weird return Forbiden)', async t => {

//     let results = await api.delete('/plugins/0/services/' + plugin.service.id)
//       .set('Authorization', 'Bearer ' + access_token)
//       .expect(403)
//       .then(res => res.body);

//     t.is(results.code, 5003);

// });

// TODO: /plugins/{plugin.id}/services/{service.id}/uploads

// TODO: /plugins/{plugin.id}/screenshots

// Cleanup test workspace

test.after('cleanup test workspace', async t => {

  await api.delete('/workspaces/' + workspace.id)
    .set('Authorization', 'Bearer ' + access_token);

  await api.delete('/workspaces/' + workspace2.id)
    .set('Authorization', 'Bearer ' + access_token);

});

