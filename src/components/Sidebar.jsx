import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  let links = [];

  switch (role) {
    case "CLERK":
      links = [{ name: "Dashboard", path: "/clerk" }];
      break;
    case "NURSE":
      links = [{ name: "Dashboard", path: "/nurse" }];
      break;
    case "DOCTOR":
      links = [{ name: "Dashboard", path: "/doctor" }];
      break;
    case "PHARMACY":
      links = [{ name: "Dashboard", path: "/pharmacy" }];
      break;
    case "BILLMASTER":
      links = [{ name: "Dashboard", path: "/billmaster" }];
      break;
    default:
      links = [];
  }

  return (
    <aside className="bg-gray-200 w-64 p-4 h-screen">
      <ul>
        {links.map((link) => (
          <li key={link.name} className="mb-2">
            <Link to={link.path} className="text-blue-600 font-semibold">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
