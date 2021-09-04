exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                {
                    id: 1,
                    email: 'kou1@email.com',
                    password: 'password'
                },
                {
                    id: 2,
                    email: 'kou2@email.com',
                    password: 'password'
                },
                {
                    id: 3,
                    email: 'kou3@email.com',
                    password: 'password'
                }
            ]);
        });
};