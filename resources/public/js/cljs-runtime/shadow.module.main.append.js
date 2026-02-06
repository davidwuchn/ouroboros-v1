
shadow.cljs.devtools.client.env.module_loaded('main');

try { ouroboros.frontend.client.init(); } catch (e) { console.error("An error occurred when calling (ouroboros.frontend.client/init)"); console.error(e); }