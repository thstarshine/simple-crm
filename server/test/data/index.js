module.exports = {
    createTestData: async (Customer, CustomerNote) => {
        await Customer.bulkCreate([
            {
                name: 'Juan T Carpenter',
                phone: '0224121234',
                address: '288 Meadow Street',
                email: 'Carpenter@email.com',
                status: 'prospective',
            },
            {
                name: 'Tina M Tracy',
                phone: '0224123626',
                address: '100  Dominey Street',
                email: 'Tracy@email.com',
                status: 'current',
            },
            {
                name: 'Shizuko K Lozano',
                phone: '0249982124',
                address: '194  Bellevue Street',
                email: 'Shizuko@email.com',
                status: 'non-active',
            },
            {
                name: 'Gracie J Forte',
                phone: '0224126744',
                address: '288 Meadow Street',
                email: 'Forte@email.com',
                status: 'prospective',
            },
            {
                name: 'Wanita D Claypool',
                phone: '0223123626',
                address: '154  Hector Street',
                email: 'Wanita@email.com',
                status: 'current',
            },
            {
                name: 'Donald H Lucio',
                phone: '024993324',
                address: '153  Hoon Hay Road',
                email: 'HALucio@email.com',
                status: 'non-active',
            },
            {
                name: 'James G Woo',
                phone: '0224121234',
                address: '111  Covent Gardens',
                email: 'James@email.com',
                status: 'prospective',
            },
            {
                name: 'Edward M Barron',
                phone: '0224129926',
                address: '39  Grigg Place',
                email: 'Edward@email.com',
                status: 'current',
            },
            {
                name: 'Ann R Newbold',
                phone: '0249112124',
                address: '224  Cross Street',
                email: 'AnnRewbold@email.com',
                status: 'non-active',
            },
            {
                name: 'Diane E Marquez',
                phone: '0224331234',
                address: '204  Moyes Lane Lake',
                email: 'Marquez@email.com',
                status: 'prospective',
            },
            {
                name: 'Dianna P Canales',
                phone: '0224423626',
                address: '100  Dominey Street',
                email: 'Canales@email.com',
                status: 'current',
            },
            {
                name: 'Joseph E Tomlin',
                phone: '0249987774',
                address: '68  Boeing Place',
                email: 'Tomlin@email.com',
                status: 'non-active',
            },
            {
                name: 'Juan T Carpenterx',
                phone: '0224555234',
                address: '2881 Meadow Street',
                email: 'Carpenterx@email.com',
                status: 'prospective',
            },
            {
                name: 'Larry A Nieves',
                phone: '0234123626',
                address: '206  Protea Street',
                email: 'Larry@email.com',
                status: 'current',
            },
            {
                name: 'Nicolette J Cornell',
                phone: '0249988824',
                address: '197  Killick Place',
                email: 'Cornell@email.com',
                status: 'non-active',
            },
            {
                name: 'Brenda H Woody',
                phone: '0224121200',
                address: '229  Chalmers Street',
                email: 'Brenda@email.com',
                status: 'prospective',
            },
            {
                name: 'Donald W Zeitz',
                phone: '0227673626',
                address: '233  Peppertree Way',
                email: 'DonaldWZeitz@email.com',
                status: 'current',
            },
            {
                name: 'Curtis D Scott',
                phone: '0211982124',
                address: '134  Greta Place',
                email: 'DScott@email.com',
                status: 'non-active',
            },
            {
                name: 'JuanXXY Carpenter',
                phone: '0222121234',
                address: '288 Meadow Street',
                email: 'Carpenteryyz@email.com',
                status: 'prospective',
            },
            {
                name: 'Daphne T Odell',
                phone: '0224133626',
                address: '154  Alpine Close',
                email: 'Odell@email.com',
                status: 'current',
            },
            {
                name: 'Donna P Roche',
                phone: '0249982333',
                address: '102  Baty Street',
                email: 'DonnaPRoche@email.com',
                status: 'non-active',
            },
            {
                name: 'Ruth D Staples',
                phone: '0224441234',
                address: '143  William Street',
                email: 'Staples@email.com',
                status: 'prospective',
            },
            {
                name: 'Steven B Cassidy',
                phone: '0222623626',
                address: '61  Beauchamp Place Lake',
                email: 'Cassidy@email.com',
                status: 'current',
            },
            {
                name: 'Ralph S McCullough',
                phone: '0249442124',
                address: '267  Bexhill Crescent',
                email: 'McCullough@email.com',
                status: 'non-active',
            },
        ]);

        await CustomerNote.bulkCreate([
            {
                customerId: 1,
                description: 'Wow, does that work?',
            },
            {
                customerId: 2,
                description: 'I often see the time 11:11 or 12:34 on clocks.',
            },
            {
                customerId: 3,
                description: 'She did her best to help him.',
            },
            {
                customerId: 4,
                description: 'They got there early, and they got really good seats.',
            },
            {
                customerId: 5,
                description: 'Abstraction is often one floor above you.',
            },
            {
                customerId: 6,
                description: 'The memory we used to share is no longer coherent.',
            },
            {
                customerId: 7,
                description: 'Hurry!',
            },
            {
                customerId: 8,
                description: 'She advised him to come back at once.',
            },
            {
                customerId: 9,
                description: 'The river stole the gods.',
            },
            {
                customerId: 10,
                description: 'The old apple revels in its authority.',
            },
            {
                customerId: 11,
                description: 'She folded her handkerchief neatly.',
            },
            {
                customerId: 12,
                description: 'I am never at home on Sundays.',
            },
            {
                customerId: 13,
                description: 'Everyone was busy, so I went to the movie alone.',
            },
            {
                customerId: 14,
                description: 'I want to buy a onesie… but know it won’t suit me.',
            },
            {
                customerId: 1,
                description: 'Mary plays the piano.',
            },
            {
                customerId: 2,
                description: 'The book is in front of the table.',
            },
            {
                customerId: 3,
                description: 'The mysterious diary records the voice.',
            },
            {
                customerId: 4,
                description: 'He ran out of money, so he had to stop playing poker.',
            },
            {
                customerId: 5,
                description: 'The lake is a long way from here.',
            },
        ]);
    },
};
