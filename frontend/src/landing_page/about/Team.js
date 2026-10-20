import React from "react";

function Team() {
    return (
        <div className="container">
            <div className="row p-3 mt-5 border-top">
                <h1 className="text-center ">People</h1>
            </div>

            <div
                className="row p-3 text-muted"
                style={{ lineHeight: "1.8", fontSize: "1.2em" }}
            >
                <div className="col-6 p-3 text-center">
                    <img
                        src="assets/tushar1.png" alt=""
                        style={{ borderRadius: "100%", width: "50%" }}
                    />
                    <h4 className="mt-5">Tushar Yadav</h4>
                    <h6>Founder, CEO</h6>
                </div>
                <div className="col-6 p-3">
                    <p>

                    </p>
                    <p>
                        Tushar Yadav

                        Full-Stack Developer & SDE Aspirant

                        "An enthusiastic and driven engineering undergraduate pursuing a B.Tech degree at Dr. A.P.J. Abdul Kalam Technical University, Passionate about building robust, scalable web applications, I specialize in the MERN stack (React, Node.js, Express.js, JavaScript/TypeScript) and clean system architecture.

                        As a core contributor to ApexTrader, my goal is to bridge the gap between high-performance financial interfaces and secure backend engineering, gearing up for ambitious 2029 SDE career milestones."
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Team;