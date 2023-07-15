import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "@/components/Spinner";
import { prettyDate } from "@/lib/date";

function AdminsPage() {
  const [email, setEmail] = useState("");
  const [adminEmails, setAdminEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function addAdmin(ev) {
    ev.preventDefault();
    axios
      .post("/api/admins", { email })
      .then((res) => {
        Swal.fire({
          title: "Administrator creat!",
          icon: "success",
          iconColor: "#ff8e3c",
          color: "#0d0d0d",
          confirmButtonColor: "#ff8e3c",
          background: "#eff0f3",
        });
        setEmail("");
        loadAdmins();
      })
      .catch((err) => {
        Swal.fire({
          title: "Eroare!",
          icon: "error",
          iconColor: "#ff8e3c",
          color: "#0d0d0d",
          confirmButtonColor: "#ff8e3c",
          background: "#eff0f3",
        });
      });
  }

  function deleteAdmin(_id, email) {
    Swal.fire({
      title: `Vrei să ștergi administratorul "${email}"?`,
      icon: "question",
      iconColor: "#0d0d0d",
      showCancelButton: true,
      cancelButtonText: "Nu",
      confirmButtonText: "Da",
      color: "#0d0d0d",
      confirmButtonColor: "#d9376e",
      cancelButtonColor: "#0d0d0d",
      background: "#eff0f3",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios.delete("/api/admins?_id=" + _id).then(() => {
          Swal.fire({
            title: "Administrator șters!",
            icon: "success",
            iconColor: "#ff8e3c",
            color: "#0d0d0d",
            confirmButtonColor: "#ff8e3c",
            background: "#eff0f3",
          });
          loadAdmins();
        });
      }
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
            placeholder="Email Google"
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
              <tr key={adminEmail.email}>
                <td>{adminEmail.email}</td>
                <td>
                  {adminEmail.createdAt && prettyDate(adminEmail.createdAt)}
                </td>
                <td>
                  <button
                    onClick={() =>
                      deleteAdmin(adminEmail._id, adminEmail.email)
                    }
                    className="btn-red"
                  >
                    Șterge
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default AdminsPage;
