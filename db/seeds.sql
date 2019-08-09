INSERT INTO employees (team_member, title, tier_level, hours_used, hours_remaining, start_date, admin) VALUES
    ("Billy Bob", "Accounting Associate", "blue", 22, 58, "2018-05-05", 0),
    ("Lilly Bob", "Accounting Manager", "green", 0, 120, "2012-05-05", 0),
    ("Philly Bob", "Senior Executive CEO", "purple", 0, 200, "1998-12-12", 1);

INSERT INTO login (team_member, username, password) VALUES
    ("Billy Bob", "billybob@mail.com", "abcdefg123"),
    ("Lilly Bob", "lillybob@mail.com", "thisisnotmypassword"),
    ("Philly Bob", "phillybob@mail.com", "ilikecheesesteaks");

INSERT INTO tiers (blue, green, purple) VALUES
    (80, 120, 200);