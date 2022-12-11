import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./miners.css";

const Miners = () => {
  const [miners, setMiners] = useState([]);
  useEffect(() => {
    const url = "http://localhost:4000/miner/getminers";
    axios.get(url).then((response) => {
      setMiners(response.data.data);
      console.log("miners:" + miners);
      console.log(response.data.data);
      // console.log(miners[0].n)
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="miner-section">
        <table className="table table-striped">
          <tbody>
            <tr>
              <td>Name</td>
              <td>Stake</td>
              <td>Reward</td>
              <td>Balance</td>
              <td>Blocks</td>
            </tr>
            {miners.map((miner) => {
              return (
                <>
                  <tr>
                    <td className="Minernames">{miner.name}</td>
                    <td>{miner.stake}</td>
                    <td>{miner.reward}</td>
                    <td>{miner.balance}</td>
                    <td>
                      {miner.BlocksMined.map((block) => {
                        return (
                          <>
                            {block ? (
                              <span className="blocks-no">{block},</span>
                            ) : (
                              <span className="blocks-no">none</span>
                            )}
                          </>
                        );
                      })}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Miners;
