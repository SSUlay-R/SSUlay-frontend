import React, { useState } from 'react';

export default function GaleShapelyAlgorithm(props) {
    const [result, setResult] = useState([]);

    function prefersNewPartner(domesticStudentPreferences, domesticStudent, newPartner, currentPartner) {
        for (let i = 0; i < domesticStudentPreferences[domesticStudent].length; i++) {
            if (domesticStudentPreferences[domesticStudent][i] === newPartner) {
                return true;
            }
            if (domesticStudentPreferences[domesticStudent][i] === currentPartner) {
                return false;
            }
        }
        return false;
    }

    function stableMatching(internationalStudentPrefernces, domesticStudentPreferences, quota) {
        let n = internationalStudentPrefernces.length;
        let m = domesticStudentPreferences.length;

        let domesticStudentPartners = Array.from(Array(m), () => new Array(n));

        let domesticStudentPartnerCount = new Array(m).fill(0);

        let internationalStudentNextPropose = new Array(n).fill(0);

        let internationalStudentEngaged = new Array(n).fill(false);

        let freeInternationalStudent = n;

        while (freeInternationalStudent > 0) {
            let internationalStudent;
            for (internationalStudent = 0; internationalStudent < n; internationalStudent++) {
                if (!internationalStudentEngaged[internationalStudent]) {
                    break;
                }
            }

            for (let i = internationalStudentNextPropose[internationalStudent]; i < n; i++) {
                let domesticStudent = internationalStudentPrefernces[internationalStudent][i];

                if (domesticStudentPartnerCount[domesticStudent] < quota[domesticStudent]) {
                    domesticStudentPartners[domesticStudent][domesticStudentPartnerCount[domesticStudent]] = internationalStudent;
                    domesticStudentPartnerCount[domesticStudent]++;
                    internationalStudentEngaged[internationalStudent] = true;
                    internationalStudentNextPropose[internationalStudent]++;
                    freeInternationalStudent--;
                    break;
                } else {
                    let replaced = false;

                    for (let j = 0; j < domesticStudentPartnerCount[domesticStudent]; j++) {
                        let currentPartner = domesticStudentPartners[domesticStudent][j];

                        if (prefersNewPartner(domesticStudentPreferences, domesticStudent, internationalStudent, currentPartner)) {
                            domesticStudentPartners[domesticStudent][j] = internationalStudent;
                            internationalStudentEngaged[internationalStudent] = true;
                            internationalStudentEngaged[currentPartner] = false;
                            internationalStudentNextPropose[internationalStudent]++;
                            replaced = true;
                            break;
                        }
                    }
                    if (replaced) {
                        break;
                    } else {
                        internationalStudentNextPropose[internationalStudent]++;
                    }
                }
            }
        }

        let stableMatchingResult = new Array(m);
        for (let i = 0; i < m; i++) {
            stableMatchingResult[i] = domesticStudentPartners[i].slice(0, domesticStudentPartnerCount[i]);
        }

        let res = [];
        for (let i = 0; i < domesticStudentPreferences.length; i++) {
            res.push(`Domestic Student ${i} is matched with International student: ${stableMatchingResult[i].join(' ')}`);
        }
        return res;
    }

    function handleClick() {
        let internationalStudentPrefernces = [
            [0, 1, 2, 3],
            [3, 0, 1, 2],
            [2, 1, 3, 0],
            [1, 2, 0, 3],
            [2, 3, 1, 0],
            [0, 3, 1, 2],
            [1, 0, 3, 2],
            [1, 3, 0, 2],
            [3, 1, 0, 2],
            [2, 3, 0, 1]
        ];

        let domesticStudentPreferences = [
            [5, 8, 3, 0],
            [1, 4, 9, 3],
            [7, 6, 4, 0],
            [9, 1, 6, 4]
        ];

        let quota = [1, 2, 3, 4];

        let res = stableMatching(internationalStudentPrefernces, domesticStudentPreferences, quota);
        setResult(res);
    }

    return (
        <div>
            <button onClick={handleClick}>Run Algorithm</button>
            <ul>
                {result.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
