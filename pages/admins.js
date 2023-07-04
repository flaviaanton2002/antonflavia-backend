import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import { prettyDate } from "@/lib/date";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminsPage() {
  const [email, setEmail] = useState("");
  const [adminEmails, setAdminEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  function addAdmin(ev) {
    ev.preventDefault();
    axios
      .post("/api/admins", { email })
      .then((res) => {
        console.log(res.data);
        alert("Administrator creat!");
        setEmail("");
        loadAdmins();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }
  function deleteAdmin(_id) {
    axios.delete("/api/admins?_id=" + _id).then(() => {
      alert("Administrator șters!");
      loadAdmins();
    });
  }
  function loadAdmins() {
    setIsLoading(true);
    axios.get("/api/admins").then((res) => {
      setAdminEmails(res.data);
      setIsLoading(false);
    });
  }
  useEffect(() => {
    loadAdmins();
  }, []);
  return (
    <Layout>
      <h1>Administratori</h1>
      <h2>Adaugă un administrator nou</h2>
      <form onSubmit={addAdmin}>
        <div className="flex gap-2">
          <input
            type="text"
            className="mb-0"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            placeholder="email google"
          />
          <button type="submit" className="btn-primary py-1 whitespace-nowrap">
            Adaugă administrator
          </button>
        </div>
      </form>

      <h2>Administratori existenți</h2>
      <table className="basic">
        <thead>
          <tr>
            <th className="text-left">Email Google administrator</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={2}>
                <div className="py-4">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          )}
          {adminEmails.length > 0 &&
            adminEmails.map((adminEmail) => (
              <tr>
                <td>{adminEmail.email}</td>
                <td>
                  {adminEmail.createdAt && prettyDate(adminEmail.createdAt)}
                </td>
                <td>
                  <button
                    onClick={() => deleteAdmin(adminEmail._id)}
                    className="btn-red"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
