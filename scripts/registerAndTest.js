const hre = require("hardhat");

async function main() {
  // دریافت آدرس‌ها از دیپلوی قبلی (یا از متغیرهای محیطی)
  // برای سادگی، فرض می‌کنیم تازه دیپلوی کرده‌ایم و آدرس‌ها را از فایل نمی‌خوانیم.
  // اگر آدرس‌ها را دارید، می‌توانید مستقیم وارد کنید.
  // در اینجا یک نمونه با آدرس‌های ثابت (تغییر دهید)
  const echoRegistryAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F"; // از دیپلوی قبلی
  const strainTokenAddress = "0x..."; // قرارداد StrainToken جدید

  // اگر آدرس‌ها مشخص نیست، از قراردادهای تازه دیپلوی شده استفاده می‌کنیم.
  // برای این کار، باید deployAll.js را اجرا کنید و آدرس‌ها را بگیرید.
  // در ادامه، فرض می‌کنیم آدرس‌ها در متغیرهای زیر هستند:
  const ERC = await hre.ethers.getContractFactory("EchoRegistry");
  const echo = await ERC.attach(echoRegistryAddress);
  const ST = await hre.ethers.getContractFactory("StrainToken");
  const strain = await ST.attach(strainTokenAddress);

  // ثبت یک اکو
  const name = "testecho.base.eth";
  const privacyLevel = 0;
  const publicKey = "0x";
  console.log("Registering echo...");
  await echo.registerEcho(name, privacyLevel, publicKey);
  console.log("Registered");

  // خواندن اطلاعات
  const caller = await hre.ethers.provider.getSigner(0);
  const address = await caller.getAddress();
  const info = await echo.getEcho(address);
  console.log("Echo info:", info[0], info[1].toString(), info[3].toString());

  // افزودن رنج
  await echo.addStrainScore(address, 1000);
  console.log("Added 1000 strain");

  // بررسی امتیاز رنج
  const newInfo = await echo.getEcho(address);
  console.log("New strain score:", newInfo[3].toString());

  // بررسی توکن: ابتدا اجازه mint به EchoRegistry بدهیم
  await strain.addMinter(echoRegistryAddress);
  // حالا اگر EchoRegistry بخواهد توکن صادر کند، می‌تواند از onStrainAdded استفاده کند.
  // برای تست مستقیم mint:
  await strain.mint(address, 500);
  const balance = await strain.balanceOf(address);
  console.log("STRAIN balance:", balance.toString());
}

main().catch(console.error);
