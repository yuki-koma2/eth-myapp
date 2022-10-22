import hardhat from "hardhat";

// NOTE : 仕様や使い方はここを参照
// https://hardhat.org/hardhat-runner/docs/advanced/hardhat-runtime-environment
const main = async () => {
    // 任意のアドレスを取得
    const [owner, randomPerson1,randomPerson2] = await hardhat.ethers.getSigners();
    // WavePortal コントラクトをコンパイル. artifacts ディレクトリにコントラクトの情報が保存される
    const waveContractFactory = await hardhat.ethers.getContractFactory("WavePortal");
    // Ethereum ネットワークを、コントラクトのためだけに作成します。(ここではローカルネットワークを使用)
    const waveContract = await waveContractFactory.deploy();
    // WavePortal コントラクトを、ローカルのブロックチェーンにデプロイ.
    const wavePortal = await waveContract.deployed();

    console.log("Contract deployed to:", wavePortal.address);
    console.log("Contract deployed by:", owner.address);
    console.log("Owner address is:", owner.address);
    console.log("randomPerson1 address is:", randomPerson1.address);
    console.log("randomPerson2 address is:", randomPerson2.address);


    await waveContract.getTotalWaves();
    // 承認を待つ処理が入っている
    await (await waveContract.doWave()).wait();
    await waveContract.getTotalWaves();
    // 別の人が実行したことを再現
    await (await waveContract.connect(randomPerson1).doWave()).wait();
    await waveContract.getTotalWaves();
    await (await waveContract.connect(randomPerson2).doWave()).wait();
    await waveContract.getTotalWaves();


}

const runDebug = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runDebug().then(r => console.log(r)).catch(e => console.log(e));