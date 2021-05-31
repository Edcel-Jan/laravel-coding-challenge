import React, { useState, useEffect } from "react";
import Axios from "axios";
export default function ReferalList() {
    const [results, setResult] = useState([]);

    const detailsConfig = {
        method: "get",
        url: "/get-details",
    };
    const getDetails = async () => {
        const { data } = await Axios(detailsConfig);
        setResult(data);
    };
    useEffect(() => {
        getDetails();
    }, []);

    return (
        <div className="container mt-5">
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email Referred</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {results.length ? (
                        results.map((el, i) => {
                            return (
                                <tr key={i}>
                                    <td>{el["name"]}</td>
                                    <td>{el["email_referred"]}</td>
                                    <td>{el["date"]}</td>
                                    <td>{el["status"]}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="4">No Records Found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
