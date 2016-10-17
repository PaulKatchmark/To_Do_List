CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
open_tasks varchar(80) NOT NULL,
task_status boolean DEFAULT false
);
