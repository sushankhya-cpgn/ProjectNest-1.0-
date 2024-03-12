import styles from "./Membersdisplay.module.css";

const Membersdisplay = ({ members }) => {
  console.log(members);
  const users = members.map((mem) => {
    return {
      fullname: `${mem.firstName} ${mem.lastName}`,
      email: mem.email,
      profilePic: mem.photo,
    };
  });
  const user = [
    {
      id: 1,
      profilePic: "https://via.placeholder.com/50",
      username: "pankaj@123",
      fullname: "Pankaj Raj Dawadi",
      email: "pankaj323@gmail.com",
      roles: "Supervisor",
    },
    {
      id: 2,
      profilePic: "https://via.placeholder.com/50",
      username: "ravi232",
      fullname: "Ravi Pajiyar",
      email: "ravi123@gmail.com",
      roles: "Student",
    },
    {
      id: 3,
      profilePic: "https://via.placeholder.com/50",
      username: "user2",
      fullname: "sushankhya chapagain",
      email: "sushank123@gmail.com",
      roles: "Student",
    },
    {
      id: 4,
      profilePic: "https://via.placeholder.com/50",
      username: "user2",
      fullname: "sushankhya chapagain",
      email: "sushank123@gmail.com",
      roles: "Student",
    },
    {
      id: 5,
      profilePic: "https://via.placeholder.com/50",
      username: "user2",
      fullname: "sushankhya chapagain",
      email: "sushank123@gmail.com",
      roles: "Student",
    },

    // Add more dummy data as needed
  ];
  return (
    <div className={styles.membersdisplay}>
      <div className={styles.table_cont}>
        <table className={styles.user_table}>
          <thead>
            <tr>
              <th>Profile pic</th>
              <th>Fullname</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className={styles.profile_pic}
                  />
                </td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Membersdisplay;
