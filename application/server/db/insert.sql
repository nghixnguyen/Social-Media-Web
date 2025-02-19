USE csc648db;

-- Creating RegisteredUsers and filling in those columns with data
INSERT INTO RegisteredUser (UserID, FirstName, LastName, Email, Password, CreatedDate) VALUES 
(1, 'John', 'Doe', 'JohnDoe@sfsu.edu', 'password1', CURDATE()),
(2, 'Jane', 'Smith', 'JaneSmith@sfsu.edu', 'password2', CURDATE()),
(3, 'Alice', 'Johnson', 'AliceJohnson@sfsu.edu', 'password3', CURDATE()),
(4, 'Bob', 'Brown', 'BobBrown@sfsu.edu', 'password4', CURDATE()),
(5, 'Charlie', 'Williams', 'CharlieWilliams@sfsu.edu', 'password5', CURDATE()),
(6, 'David', 'Jones', 'DavidJones@sfsu.edu', 'password6', CURDATE()),
(7, 'Eve', 'Garcia', 'EveGarcia@sfsu.edu', 'password7', CURDATE()),
(8, 'Frank', 'Martinez', 'FrankMartinez@sfsu.edu', 'password8', CURDATE()),
(9, 'Grace', 'Lee', 'GraceLee@sfsu.edu', 'password9', CURDATE()),
(10, 'Henry', 'Harris', 'HenryHarris@sfsu.edu','password10', CURDATE()),
(11, 'Isaac', 'Newton', 'IsaacNewton@sfsu.edu', 'password11', CURDATE()),
(12, 'Aisha', 'Khan', 'AishaKhan@sfsu.edu', 'password12', CURDATE()),
(13, 'Luis', 'Garcia', 'LuisGarcia@sfsu.edu', 'password13', CURDATE()),
(14, 'Chen', 'Wang', 'ChenWang@sfsu.edu', 'password14', CURDATE()),
(15, 'Amara', 'Diallo', 'AmaraDiallo@sfsu.edu',  'password15', CURDATE()),
(16, 'Mikhail', 'Ivanov', 'MikhailIvanov@sfsu.edu', 'password16', CURDATE()),
(17, 'Jyoti', 'Patel', 'JyotiPatel@sfsu.edu', 'password17', CURDATE()),
(18, 'Mia', 'Nguyen', 'MiaNguyen@sfsu.edu', 'password18', CURDATE()),
(19, 'Carlos', 'Hernandez', 'CarlosHernandez@sfsu.edu', 'password19', CURDATE()),
(20, 'Fatima', 'Ali', 'FatimaAli@sfsu.edu','password20', CURDATE()),
(21, 'Ken', 'Tanaka', 'KenTanaka@sfsu.edu',  'password21', CURDATE()),
(22, 'Nadia', 'Elamin', 'NadiaElamin@sfsu.edu', 'password22', CURDATE()),
(23, 'Oscar', 'Lopez', 'OscarLopez@sfsu.edu', 'password23', CURDATE()),
(24, 'Priya', 'Kumar', 'PriyaKumar@sfsu.edu', 'password24', CURDATE()),
(25, 'Quang', 'Pham', 'QuangPham@sfsu.edu', 'password25', CURDATE()),
(26, 'Rosa', 'Ortega', 'RosaOrtega@sfsu.edu', 'password26', CURDATE()),
(27, 'Siti', 'Rahman', 'SitiRahman@sfsu.edu', 'password27', CURDATE()),
(28, 'Tariq', 'Malik', 'TariqMalik@sfsu.edu', 'password28', CURDATE()),
(29, 'Ursula', 'Koenig', 'UrsulaKoenig@sfsu.edu', 'password29', CURDATE()),
(30, 'Victor', 'Smith', 'VictorSmith@sfsu.edu', 'password30', CURDATE()),
(31, 'Wafa', 'Hassan', 'WafaHassan@sfsu.edu', 'password31', CURDATE()),
(32, 'Xiu', 'Li', 'XiuLi@sfsu.edu', 'password32', CURDATE()),
(33, 'Yara', 'Ismail', 'YaraIsmail@sfsu.edu', 'password33', CURDATE()),
(34, 'Zane', 'Abdullah', 'ZaneAbdullah@sfsu.edu', 'password34', CURDATE()),
(35, 'Alejandro', 'Mendez', 'AlejandroMendez@sfsu.edu', 'password35', CURDATE()),
(36, 'Binta', 'Sarr', 'BintaSarr@sfsu.edu', 'password36', CURDATE()),
(37, 'Chidinma', 'Eze', 'ChidinmaEze@sfsu.edu',  'password37', CURDATE()),
(38, 'Daouda', 'Bamba', 'DaoudaBamba@sfsu.edu', 'password38', CURDATE()),
(39, 'Naruto', 'Uzumaki', 'NarutoUzumaki@sfsu.edu', 'password39', CURDATE()),
(40, 'Sasuke', 'Uchiha', 'SasukeUchiha@sfsu.edu', 'password40', CURDATE()),
(41, 'Luffy', 'Monkey', 'LuffyMonkey@sfsu.edu', 'password41', CURDATE()),
(42, 'Ichigo', 'Kurosaki', 'IchigoKurosaki@sfsu.edu', 'password42', CURDATE()),
(43, 'Erza', 'Scarlet', 'ErzaScarlet@sfsu.edu', 'password43', CURDATE()),
(44, 'Mikasa', 'Ackerman', 'MikasaAckerman@sfsu.edu',  'password44', CURDATE()),
(45, 'Edward', 'Elric', 'EdwardElric@sfsu.edu',  'password45', CURDATE()),
(46, 'Light', 'Yagami', 'LightYagami@sfsu.edu', 'password46', CURDATE()),
(47, 'Sakura', 'Haruno', 'SakuraHaruno@sfsu.edu',  'password47', CURDATE()),
(48, 'Goku', 'Kakarot', 'GokuKakarot@sfsu.edu',  'password48', CURDATE()),
(49, 'Asuka', 'Langley', 'AsukaLangley@sfsu.edu',  'password49', CURDATE()),
(50, 'Shinji', 'Ikari', 'ShinjiIkari@sfsu.edu',  'password50', CURDATE());



INSERT INTO Student (UserID, StudentID, Major, Minor, ExpectedGraduation, BeginDate) VALUES 
(1, 910000001, 'Computer Science', NULL, '2025-05-15', '2022-08-15'),
(2, 910000002, 'Computer Science', NULL, '2024-05-15', '2021-08-15'),
(3, 910000003, 'Computer Science', NULL, '2023-05-15', '2020-08-15'),
(4, 910000004, 'Computer Science', 'Math', '2026-05-15', '2023-08-15'),
(5, 910000005, 'Computer Science', 'Math', '2026-05-15', '2023-08-15'),
(6, 910000006, 'Computer Science', 'Business', '2026-05-15', '2023-08-15'),
(7, 910000007, 'Computer Science', 'Business', '2025-05-15', '2022-08-15'),
(8, 910000008, 'Computer Science', NULL, '2024-05-15', '2021-08-15'),
(9, 910000009, 'Computer Science', NULL, '2023-05-15', '2020-08-15'),
(10, 910000010, 'Computer Science', 'Math', '2026-05-15', '2023-08-15'),
(13, 910000013, 'Mathematics', NULL, '2022-05-15', '2019-08-15'),
(14, 910000014, 'Environmental Science', NULL, '2024-05-15', '2021-08-15'),
(15, 910000015, 'Psychology', NULL, '2025-05-15', '2022-08-15'),
(16, 910000016, 'Architecture', NULL, '2023-05-15', '2020-08-15'),
(17, 910000017, 'Literature', NULL, '2026-05-15', '2023-08-15'),
(18, 910000018, 'Music', NULL, '2025-05-15', '2022-08-15'),
(19, 910000019, 'Theatre Arts', NULL, '2024-05-15', '2021-08-15'),
(20, 910000020, 'Medicine', NULL, '2022-05-15', '2019-08-15'),
(21, 910000021, 'Dentistry', NULL, '2024-05-15', '2021-08-15'),
(22, 910000022, 'Pharmacy', NULL, '2026-05-15', '2023-08-15'),
(23, 910000023, 'Law', NULL, '2023-05-15', '2020-08-15'),
(24, 910000024, 'Philosophy', NULL, '2025-05-15', '2022-08-15'),
(25, 910000025, 'Political Science', NULL, '2022-05-15', '2019-08-15'),
(26, 910000026, 'Economics', NULL, '2026-05-15', '2023-08-15'),
(27, 910000027, 'Agriculture', NULL, '2024-05-15', '2021-08-15'),
(28, 910000028, 'Anthropology', NULL, '2025-05-15', '2022-08-15'),
(29, 910000029, 'Astronomy', NULL, '2022-05-15', '2019-08-15'),
(30, 910000030, 'Chemical Engineering', NULL, '2026-05-15', '2023-08-15'),
(31, 910000031, 'Civil Engineering', NULL, '2023-05-15', '2020-08-15'),
(32, 910000032, 'Dance', NULL, '2025-05-15', '2022-08-15'),
(33, 910000033, 'Film Studies', NULL, '2026-05-15', '2023-08-15'),
(34, 910000034, 'Geography', NULL, '2024-05-15', '2021-08-15'),
(35, 910000035, 'Marine Biology', NULL, '2022-05-15', '2019-08-15');


INSERT INTO Alumni (UserID, AlumniID, Major, GraduationDate) VALUES 
(36, 900000036, 'History', '2010-05-15'),
(37, 900000037, 'Literature', '2011-05-15'),
(38, 900000038, 'Engineering', '2012-05-15'),
(39, 900000039, 'Physics', '2009-05-15'),
(40, 900000040, 'Business', '2014-05-15'),
(41, 900000041, 'Computer Science', '2015-05-15'),
(42, 900000042, 'Art', '2016-05-15'),
(43, 900000043, 'Economics', '2017-05-15'),
(44, 900000044, 'Biology', '2018-05-15'),
(45, 900000045, 'Chemistry', '2013-05-15');


INSERT INTO Staff (UserID, StaffID) VALUES 
(46, 700000046),
(47, 700000047),
(48, 700000048),
(49, 700000049),
(50, 700000050);

INSERT INTO Post (AuthorID, CreatedDate, EditDate, PostDescription) VALUES 
(1, CURDATE(), NULL, 'Old picture from school orientation'),
(2, CURDATE(), NULL, 'Wow CSC648 is awesome!'),
(3, CURDATE(), NULL, 'Attention all SFSU students, for those who do not know there is an ongoing Code Jams event that will be going until Oct 30');


-- hard coded postID
INSERT INTO `csc648db`.`Post` (`AuthorID`, `CreatedDate`, `EditDate`, `PostDescription`)
VALUES (1, CURDATE(), CURDATE(), 'Here is a post with an image from S3');

-- Link the picture to the post using LAST_INSERT_ID() to get the recently added PostID
INSERT INTO `csc648db`.`Picture` (`PostID`, `S3_PATH`, `FileName`, `UploadDate`)
VALUES (1, 'https://csc648s3.s3.us-west-1.amazonaws.com/myPictures/4947506.png?AWSAccessKeyId=AKIAQCQC32ET544BPYIL&Expires=1698101726&Signature=wjT3n3hGRwJ8mvfSDeKb%2BasKtKA%3D', '4947506.png', CURDATE());

-- Inserting 10 posts with descriptions for UserID 1
INSERT INTO `Post` (`AuthorID`, `CreatedDate`, `PostDescription`) VALUES
(1, '2023-10-25', 'This is post 1 from user 1.'),
(1, '2023-10-25', 'This is post 2 from user 1.'),
(1, '2023-10-25', 'This is post 3 from user 1.'),
(1, '2023-10-25', 'This is post 4 from user 1.'),
(1, '2023-10-25', 'This is post 5 from user 1.'),
(1, '2023-10-25', 'This is post 6 from user 1.'),
(1, '2023-10-25', 'This is post 7 from user 1.'),
(1, '2023-10-25', 'This is post 8 from user 1.'),
(1, '2023-10-25', 'This is post 9 from user 1.'),
(1, '2023-10-25', 'This is post 10 from user 1.');

-- Inserting likes to troubleshooting purposes:
INSERT INTO csc648db.UserLikes (UserID, PostID) VALUES
(1, 1),  -- John Doe likes Post 1
(2, 1),  -- Jane Smith likes Post 1
(3, 1),  -- Alice Johnson likes Post 1
(4, 1),  -- Bob Brown likes Post 1
(5, 1),  -- Charlie Williams likes Post 1
(6, 1),  -- David Jones likes Post 1
(7, 1),  -- Eve Garcia likes Post 1
(8, 1);  -- Frank Martinez likes Post 1


