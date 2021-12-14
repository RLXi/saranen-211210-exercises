# saranen-211210-exercises

Compilation of exercises, up to exercise 15. However, some digging into to the code is required because where on exercise begins and ends is not marked at all. I trust people accessing this repo know what to look for.

---

Database used in the exercises runs in Docker, build with command

`docker run --name mariadbtest -e MYSQL_ROOT_PASSWORD=MODIFY-ME -p 3306:3306 -d docker.io/library/mariadb:10.3`

I'm not sure if anything in this repo works with other setups. You are welcome to try find out.

`backend` and `frontend` are separated for now, but `frontend` directory could be included in the `backend` directory. Then the `app.use(express.static("build"));` line in `backend/index.js` can be edited to point `frontend/build` directory.
