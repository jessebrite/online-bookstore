# INSERT IGNORE INTO `book-store-dev`.`authorities`
# 		VALUES (NULL, 'anonymous', 'write'),
# 					(NULL, 'user', 'write'),
# 					(NULL, 'jondoe', 'read'),
# 					(NULL, 'jantrumaen', 'write'),
# 					(NULL, 'john', 'read');

# INSERT IGNORE INTO `book-store-dev`.`users`
#     VALUES (NULL, 'John', 'Snow', 'anonymous', 'anonyous@eg.com', 'password', true),
#            (NULL, 'Steve', 'Gyan', 'user', 'user@user.com', 'secret', true),
#            (NULL, 'Steve', 'Asante', 'jondoe', 'jondoe@gold.ca', '12345', true),
#            (NULL, 'Baah', 'Akyeamfour', 'jantrumaen', 'jantru@maen.me', '5ecret', false),
#            (NULL, 'Anim', 'Asante', 'anim1', 'anim1@mine.ca', 'word', true);

# INSERT INTO roles(name) VALUES('ROLE_USER');
# INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
# INSERT INTO roles(name) VALUES('ROLE_ADMIN');