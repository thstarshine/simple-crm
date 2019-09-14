const { test } = require('tap');
const { build } = require('../helper');

test('cutstomer is loaded', async t => {
    const app = build(t);

    // test customer list route
    const res1 = await app.inject({
        url: '/customers',
    });
    const jsonData1 = JSON.parse(res1.payload);
    t.ok(jsonData1);
    t.equal(jsonData1.length, 24);
    t.equal(jsonData1[0].id, 1);
    t.equal(jsonData1[0].name, 'Juan T Carpenter');
    t.equal(jsonData1[0].phone, '0224121234');
    t.equal(jsonData1[0].email, 'Carpenter@email.com');
    t.equal(jsonData1[0].status, 'prospective');

    // test specific customer detail route
    const res2 = await app.inject({
        url: '/customer/1',
    });
    const jsonData2 = JSON.parse(res2.payload);
    t.ok(jsonData2);
    t.equal(jsonData2.id, 1);
    t.equal(jsonData2.name, 'Juan T Carpenter');
    t.equal(jsonData2.phone, '0224121234');
    t.equal(jsonData2.email, 'Carpenter@email.com');
    t.equal(jsonData2.address, '288 Meadow Street');
    t.equal(jsonData2.status, 'prospective');
    t.equal(jsonData2.CustomerNotes.length, 2);
    t.equal(jsonData2.CustomerNotes[0].description, 'Wow, does that work?');

    // test update customer data route
    const res3 = await app.inject({
        method: 'post',
        url: '/customer/1',
        payload: {
            status: 'current',
            notes: [{ id: 1, deleted: true }, { description: 'Ya' }],
        },
    });
    t.ok(res3.payload);

    // test if customer data is updated
    const res4 = await app.inject({
        url: '/customer/1',
    });
    const jsonData4 = JSON.parse(res4.payload);
    t.ok(jsonData4);
    t.equal(jsonData4.id, 1);
    t.equal(jsonData4.name, 'Juan T Carpenter');
    t.equal(jsonData4.phone, '0224121234');
    t.equal(jsonData4.email, 'Carpenter@email.com');
    t.equal(jsonData4.address, '288 Meadow Street');
    t.equal(jsonData4.status, 'current');
    t.equal(jsonData2.CustomerNotes.length, 2);
    t.equal(jsonData4.CustomerNotes[jsonData4.CustomerNotes.length - 1].description, 'Ya');
});
