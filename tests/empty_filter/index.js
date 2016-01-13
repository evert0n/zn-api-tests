/**
 * Test form records with empty filters
 *
 */
var test = require('ava');
var supertest = require('supertest-as-promised');
var config = require('../../config');

const api = supertest(config.api.url);
const access_token = config.api.accessToken;

let workspace = {},
  form = {},
  records = [],
  dataView = {},
  role = {};

test.before('create test workspace', async t => {

  // create workspace
  workspace = await api.post('/workspaces')
    .send({name: 'Test empty data filters ' + new Date()})
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

  // create form
  form = await api.post('/forms')
    .send({name: 'F1', workspace: { id: workspace.id}})
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

  let fieldsData = [];

  for (let i=0; i<10; i++) {
    fieldsData.push({label: 'F'+i, type:'text-input'});
  }

  // create fields
  await api.post('/forms/' + form.id + '/fields')
    .send(fieldsData)
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

  // update form with fields
  form = await api.get('/forms/' + form.id)
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

  let recordsData = [];

  // create records
  for (let i=0; i<10; i++) {
    let r = {};
    form.fields.forEach(f => {
      r['field'+f.id] = 'v' + i + '-' + f.id + '-' + Math.random().toString(10);
    });
    recordsData.push(r);
  }

  await api.post('/forms/' + form.id + '/records')
    .send(recordsData)
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

  records = await api.get('/forms/' + form.id + '/records')
    .set('Authorization', 'Bearer ' + access_token)
    .expect(200)
    .then(res => res.body.data);

});

test('should return all records with an empty filter', async t => {

    let expected = await api.get('/forms/' + form.id + '/records')
      .set('Authorization', 'Bearer ' + access_token)
      .query({related:null, attributes:'id'})
      .expect(200)
      .then(res => res.body.data);

    let results = await api.get('/forms/' + form.id + '/records')
      .set('Authorization', 'Bearer ' + access_token)
      .query({filter:{and:[]}, related:null, attributes:'id'})
      .expect(200)
      .then(res => res.body.data);

    t.same(results, expected);

});

test.after('cleanup test workspace', async t => {

  let res = await api.delete('/workspaces/' + workspace.id)
    .set('Authorization', 'Bearer ' + access_token);

});
