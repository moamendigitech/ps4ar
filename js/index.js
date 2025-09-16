const ckbaj = document.getElementById('ckbaj');
const ckbdc = document.getElementById('ckbdc');
const visibleDiv = localStorage.getItem('visibleDiv') || 'jailbreak-page';
const savedaj = localStorage.getItem('autojbstate');
const savedc = localStorage.getItem('dbugc');
const menuBtns = document.querySelectorAll('.menu-btn');
const psBtns = document.querySelectorAll('.ps-btn');
const plsbtn = document.querySelectorAll('.button-container button');
const consoleDev = document.getElementById("console");


var ps4fw

window.addEventListener('DOMContentLoaded', loadsettings);

document.getElementById('jailbreak').addEventListener('click', () => {
  jailbreak();
});

document.getElementById('binloader').addEventListener('click', () => {
  binloader();
});

document.querySelectorAll('button[data-func]').forEach(button => {
  button.addEventListener('click', () => {
    const payload = button.getAttribute('data-func');
    Loadpayloads(payload);
  });
});

document.getElementById('generate-cache-btn').addEventListener('click', () => {
  fetch('/generate_manifest', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      // تم استبدال alert() بوظيفة عرض رسالة مخصصة
      displayMessage(data.message, 'success');
    })
    .catch(error => {
      // تم استبدال alert() بوظيفة عرض رسالة مخصصة
      displayMessage('خطأ: ' + error + "\nهذا الخيار يعمل فقط على الخادم المحلي!\nيرجى التأكد من أن الخادم يعمل.", 'error');
    });
});

document.getElementById('update-exploit').addEventListener('click', () => {
  fetch('/update_exploit', { method: 'POST' })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        // تم استبدال alert() بوظيفة عرض رسالة مخصصة
        displayMessage(data.message, 'success');
      } else {
        // تم استبدال alert() بوظيفة عرض رسالة مخصصة
        displayMessage(data.message, 'error');
      }
    })
    .catch(err => {
      // تم استبدال alert() بوظيفة عرض رسالة مخصصة
      displayMessage('خطأ في الاتصال بالخادم.', 'error');
    });
});

// وظيفة لعرض رسالة مخصصة بدلاً من alert()
function displayMessage(message, type) {
  const messageBox = document.createElement('div');
  messageBox.className = `message-box ${type}`;
  messageBox.innerText = message;
  document.body.appendChild(messageBox);
  setTimeout(() => {
    messageBox.remove();
  }, 3000);
}

// وظائف تغيير الصفحات
function showjailbreak() {
  document.getElementById('jailbreak-page').classList.remove('hidden');
  document.getElementById('payloads-page').classList.add('hidden');
  document.getElementById('settings-page').classList.add('hidden');
  document.getElementById('about-page').classList.add('hidden');
  document.getElementById('center-btn-wrap').style.display = 'flex';
  localStorage.setItem('visibleDiv', 'jailbreak-page');
  updateActiveMenuButton('jailbreak-page');
  document.getElementById("header-title").textContent = "PSFree";
}

function showpayloads() {
  document.getElementById('jailbreak-page').classList.add('hidden');
  document.getElementById('payloads-page').classList.remove('hidden');
  document.getElementById('settings-page').classList.add('hidden');
  document.getElementById('about-page').classList.add('hidden');
  document.getElementById('center-btn-wrap').style.display = 'none';
  localStorage.setItem('visibleDiv', 'payloads-page');
  updateActiveMenuButton('payloads-page');
  document.getElementById("header-title").textContent = "الحمولات";
}

function showsettings() {
  document.getElementById('jailbreak-page').classList.add('hidden');
  document.getElementById('payloads-page').classList.add('hidden');
  document.getElementById('settings-page').classList.remove('hidden');
  document.getElementById('about-page').classList.add('hidden');
  document.getElementById('center-btn-wrap').style.display = 'none';
  localStorage.setItem('visibleDiv', 'settings-page');
  updateActiveMenuButton('settings-page');
  document.getElementById("header-title").textContent = "الإعدادات";
}

function showabout() {
  document.getElementById('jailbreak-page').classList.add('hidden');
  document.getElementById('payloads-page').classList.add('hidden');
  document.getElementById('settings-page').classList.add('hidden');
  document.getElementById('about-page').classList.remove('hidden');
  document.getElementById('center-btn-wrap').style.display = 'none';
  localStorage.setItem('visibleDiv', 'about-page');
  updateActiveMenuButton('about-page');
  document.getElementById("header-title").textContent = "حول";
}

function updateActiveMenuButton(pageId) {
  menuBtns.forEach(btn => btn.classList.remove('active'));
  let btnId;
  switch (pageId) {
    case 'jailbreak-page':
      btnId = 'jailbreakbtn';
      break;
    case 'payloads-page':
      btnId = 'payloadsbtn';
      break;
    case 'settings-page':
      btnId = 'settings-btn';
      break;
    case 'about-page':
      btnId = 'about-btn';
      break;
  }
  const activeButton = document.getElementById(btnId);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

// وظائف التحقق والتحميل
function CheckFW() {
  try {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("PlayStation 4") !== -1) {
      var match = userAgent.match(/WebKit\/([\d.]+)/);
      if (match) {
        var webKitVersion = parseFloat(match[1]);
        if (webKitVersion >= 10600) {
          ps4fw = 9.04;
        } else if (webKitVersion >= 8000) {
          ps4fw = 8.00;
        } else if (webKitVersion >= 6000) {
          ps4fw = 6.00;
        } else if (webKitVersion >= 5000) {
          ps4fw = 5.00;
        } else if (webKitVersion >= 4000) {
          ps4fw = 4.00;
        } else if (webKitVersion >= 3000) {
          ps4fw = 3.00;
        } else if (webKitVersion >= 2000) {
          ps4fw = 2.00;
        } else {
          ps4fw = 1.00;
        }
      }
    }
  } catch (e) {
    console.error("خطأ في التحقق من الإصدار:", e);
    ps4fw = "غير معروف";
  }
  document.getElementById("firmware-text").textContent = "إصدار الجهاز: " + (ps4fw || "غير معروف");
}

function loadajbsettings() {
  if (savedaj == "true") {
    ckbaj.checked = true;
  } else {
    ckbaj.checked = false;
  }
}

function loaddcsettings() {
  if (savedc == "true") {
    ckbdc.checked = true;
  } else {
    ckbdc.checked = false;
  }
}

function loadsettings() {
  CheckFW();
  loadajbsettings();
  loaddcsettings();
  updatejbFlavorButtons();
  
  const pageMap = {
    'jailbreak-page': showjailbreak,
    'payloads-page': showpayloads,
    'settings-page': showsettings,
    'about-page': showabout,
  };
  (pageMap[visibleDiv] || showjailbreak)();
}

ckbaj.addEventListener('change', () => {
  if (ckbaj.checked) {
    localStorage.setItem('autojbstate', 'true');
  } else {
    localStorage.setItem('autojbstate', 'false');
  }
});

ckbdc.addEventListener('change', () => {
  if (ckbdc.checked) {
    localStorage.setItem('dbugc', 'true');
  } else {
    localStorage.setItem('dbugc', 'false');
  }
});

function updatejbFlavorButtons() {
  const chosenFlavor = localStorage.getItem('jbflavor');
  document.getElementById('load-hen').style.display = 'none';
  document.getElementById('load-goldhen').style.display = 'none';
  document.getElementById('install-psfrf').style.display = 'none';

  if (chosenFlavor === 'GoldHEN') {
    document.getElementById('load-goldhen').style.display = 'inline-block';
  } else if (chosenFlavor === 'HEN') {
    document.getElementById('load-hen').style.display = 'inline-block';
  } else {
    document.getElementById('install-psfrf').style.display = 'inline-block';
  }
}

function savejbflavor() {
  const selected = document.querySelector('input[name="hen"]:checked');
  if (selected) {
    localStorage.setItem('jbflavor', selected.value);
    updatejbFlavorButtons();
  }
}

// وظائف الجيلبريك
async function jailbreak() {
  try {
    const loader = document.getElementById('loader-container');
    loader.classList.add('visible');
    sessionStorage.removeItem('binloader');
    
    const modules = await loadMultipleModules([
      '../psfree/jailbreak.js',
      '../psfree/alert.mjs'
    ]);
    console.log("تم تحميل جميع الوحدات!");

    const jailbreakModule = modules[0];
    if (jailbreakModule && typeof jailbreakModule.runJailbreak === 'function') {
      await jailbreakModule.runJailbreak();
    } else {
      console.error("وظيفة Jailbreak غير موجودة في الوحدة Jailbreak.js");
    }
  } catch (e) {
    console.error("فشل الجيلبريك:", e);
    // تم استبدال alert() بوظيفة عرض رسالة مخصصة
    displayMessage('فشل الجيلبريك، يرجى المحاولة مرة أخرى.', 'error');
  } finally {
    const loader = document.getElementById('loader-container');
    loader.classList.remove('visible');
  }
}

async function binloader() {
  try {
    const loader = document.getElementById('loader-container');
    loader.classList.add('visible');
    sessionStorage.setItem('binloader', 1);
    const modules = await loadMultipleModules([
      '../psfree/alert.mjs'
    ]);
    console.log("تم تحميل جميع الوحدات!");

    const goldhenModule = modules[0];
    if (goldhenModule && typeof goldhenModule.runBinLoader === 'function') {
      goldhenModule.runBinLoader();
    } else {
      console.error("وظيفة GoldHEN غير موجودة في وحدة GoldHEN.js");
    }
  } catch (e) {
    console.error("فشل الجيلبريك:", e);
  }
}

async function Loadpayloads(payload) {
  try {
    let modules;
    sessionStorage.removeItem('binloader');
    if (isHttps()) {
      modules = await loadMultipleModules([
        '../payloads/payloads.js',
        '../psfree/alert.mjs'
      ]);
      console.log("تم تحميل جميع الوحدات!");
    } else {
      modules = await loadMultipleModules([
        '../payloads/payloads.js'
      ]);
      console.log("تم تحميل جميع الوحدات!");
    }

    const payloadModule = modules[0];
    if (payloadModule && typeof payloadModule[payload] === 'function') {
      payloadModule[payload]();
    } else {
      console.error(`وظيفة ${payload} غير موجودة في وحدة payloads.js`);
    }
  } catch (e) {
    console.error(`فشل تحميل ${payload}:`, e);
  }
}

function choosejb(flavor) {
  localStorage.setItem('jbflavor', flavor);
  updatejbFlavorButtons();
}
