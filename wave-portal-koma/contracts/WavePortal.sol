pragma solidity ^0.8.17;
// SPDX-License-Identifier: MIT
// ↑これを書かないとwaringが出る


import "hardhat/console.sol";

// contract宣言はclass宣言のようなものらしい
contract WavePortal {
    // 符号なし整数のデータ型 https://book.ethereum-jp.net/solidity/var_and_data_type
    // uint256は256bitの符号なし整数. 2^256-1まで表現できる.

    // waveの数をカウントする状態変数。WavePortal コントラクトのストレージに保存
    uint256 totalWaves;

    constructor() {
        console.log("Hello world. Here is my first smart contract!");
    }

    function doWave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
        // msg.senderは、現在のトランザクションを実行しているウォレットアドレス
    }
    // NOTE: Solidity では関数修飾子によりデータを記録する際のコストに影響するので注意。
    // 書き込み場合に発生する。読み込む場合は不要。view : read only + no state change, pure : no read or write to state
    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d waves!", totalWaves);
        return totalWaves;
    }
}