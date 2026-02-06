goog.provide('ouroboros.frontend.websocket');
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.websocket !== 'undefined') && (typeof ouroboros.frontend.websocket.ws_connection !== 'undefined')){
} else {
ouroboros.frontend.websocket.ws_connection = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.websocket !== 'undefined') && (typeof ouroboros.frontend.websocket.reconnect_timeout !== 'undefined')){
} else {
ouroboros.frontend.websocket.reconnect_timeout = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.websocket !== 'undefined') && (typeof ouroboros.frontend.websocket.reconnect_attempts !== 'undefined')){
} else {
ouroboros.frontend.websocket.reconnect_attempts = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
}
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.websocket !== 'undefined') && (typeof ouroboros.frontend.websocket.subscribed_topics !== 'undefined')){
} else {
ouroboros.frontend.websocket.subscribed_topics = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.EMPTY);
}
ouroboros.frontend.websocket.max_reconnect_attempts = (5);
ouroboros.frontend.websocket.reconnect_delay_ms = (3000);
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.websocket !== 'undefined') && (typeof ouroboros.frontend.websocket.handle_message !== 'undefined')){
} else {
ouroboros.frontend.websocket.handle_message = (function (){var method_table__5599__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__5600__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__5601__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__5602__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__5603__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),(function (){var fexpr__40868 = cljs.core.get_global_hierarchy;
return (fexpr__40868.cljs$core$IFn$_invoke$arity$0 ? fexpr__40868.cljs$core$IFn$_invoke$arity$0() : fexpr__40868.call(null, ));
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("ouroboros.frontend.websocket","handle-message"),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__5603__auto__,method_table__5599__auto__,prefer_table__5600__auto__,method_cache__5601__auto__,cached_hierarchy__5602__auto__));
})();
}
ouroboros.frontend.websocket.handle_message.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Keyword(null,"default","default",-1987822328),(function (message){
console.log("Unknown WebSocket message type:",new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(message));

console.log("Full message keys:",cljs.core.keys(message));

return console.log("Full message:",cljs.core.clj__GT_js(message));
}));
ouroboros.frontend.websocket.handle_message.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Keyword(null,"connected","connected",-169833045),(function (p__40870){
var map__40871 = p__40870;
var map__40871__$1 = cljs.core.__destructure_map(map__40871);
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40871__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
var timestamp = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40871__$1,new cljs.core.Keyword(null,"timestamp","timestamp",579478971));
return console.log("WebSocket connected, client ID:",client_id);
}));
ouroboros.frontend.websocket.handle_message.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Keyword("telemetry","event","telemetry/event",1056223071),(function (p__40873){
var map__40875 = p__40873;
var map__40875__$1 = cljs.core.__destructure_map(map__40875);
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40875__$1,new cljs.core.Keyword(null,"data","data",-232669377));
console.log("Telemetry event received:",data);

var temp__5825__auto__ = cljs.core.deref(com.fulcrologic.fulcro.application.app);
if(cljs.core.truth_(temp__5825__auto__)){
var app = temp__5825__auto__;
return com.fulcrologic.fulcro.algorithms.merge.merge_BANG_(app,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"telemetry","telemetry",-764940235),new cljs.core.Keyword("telemetry","events","telemetry/events",1566822626),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [data], null)], null));
} else {
return null;
}
}));
ouroboros.frontend.websocket.handle_message.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Keyword("builder-session","update","builder-session/update",1124789872),(function (p__40877){
var map__40878 = p__40877;
var map__40878__$1 = cljs.core.__destructure_map(map__40878);
var session_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40878__$1,new cljs.core.Keyword(null,"session-id","session-id",-1147060351));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40878__$1,new cljs.core.Keyword(null,"data","data",-232669377));
console.log("Builder session update received:",session_id,data);

var temp__5825__auto__ = cljs.core.deref(com.fulcrologic.fulcro.application.app);
if(cljs.core.truth_(temp__5825__auto__)){
var app = temp__5825__auto__;
return com.fulcrologic.fulcro.algorithms.merge.merge_BANG_(app,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("page","id","page/id",-1375529051),new cljs.core.Keyword(null,"builder-session-update","builder-session-update",1223953381),new cljs.core.Keyword("builder-session","id","builder-session/id",-1601814544),session_id,new cljs.core.Keyword("builder-session","data","builder-session/data",-61323045),data], null));
} else {
return null;
}
}));
ouroboros.frontend.websocket.handle_message.cljs$core$IMultiFn$_add_method$arity$3(null, new cljs.core.Keyword(null,"pong","pong",-172484958),(function (p__40881){
var map__40883 = p__40881;
var map__40883__$1 = cljs.core.__destructure_map(map__40883);
var timestamp = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40883__$1,new cljs.core.Keyword(null,"timestamp","timestamp",579478971));
return null;
}));
/**
 * Get WebSocket URL based on current location
 * 
 * In development, Shadow-CLJS serves on port 8081 but WebSocket server is on 8080.
 * We detect this and use the correct port.
 */
ouroboros.frontend.websocket.get_ws_url = (function ouroboros$frontend$websocket$get_ws_url(){
var protocol = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(window.location.protocol,"https:"))?"wss:":"ws:");
var host = window.location.host;
var port = window.location.port;
return [protocol,"//",cljs.core.str.cljs$core$IFn$_invoke$arity$1(window.location.hostname),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(port,"8081"))?":8080":((cljs.core.seq(port))?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(port)].join(''):"")),"/ws"].join('');
});
/**
 * Establish WebSocket connection
 */
ouroboros.frontend.websocket.connect_BANG_ = (function ouroboros$frontend$websocket$connect_BANG_(){
if(cljs.core.truth_(cljs.core.deref(ouroboros.frontend.websocket.ws_connection))){
return null;
} else {
try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.websocket.reconnect_attempts,cljs.core.inc);

var ws = (new WebSocket(ouroboros.frontend.websocket.get_ws_url()));
(ws.onopen = (function (){
console.log("WebSocket connection opened");

cljs.core.reset_BANG_(ouroboros.frontend.websocket.reconnect_attempts,(0));

return ws.send(JSON.stringify(({"type": "subscribe", "topic": "telemetry/events"})));
}));

(ws.onmessage = (function (event){
try{var json_data = event.data;
console.log("WebSocket raw JSON:",json_data);

var parsed = JSON.parse(json_data);
console.log("WebSocket parsed JS object:",parsed);

if(((cljs.core.object_QMARK_(parsed)) && ((!(cljs.core.array_QMARK_(parsed)))))){
var data = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(parsed,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0));
var data__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(data))?cljs.core.update.cljs$core$IFn$_invoke$arity$3(data,new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.keyword):data);
console.log("WebSocket CLJS data:",data__$1);

if(cljs.core.truth_(new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(data__$1))){
return ouroboros.frontend.websocket.handle_message.cljs$core$IFn$_invoke$arity$1(data__$1);
} else {
return console.warn("WebSocket message missing :type:",data__$1);
}
} else {
return console.warn("WebSocket received non-object message:",parsed);
}
}catch (e40896){if((e40896 instanceof Error)){
var e = e40896;
return console.error("WebSocket message error:",e);
} else {
throw e40896;

}
}}));

(ws.onclose = (function (event){
console.log("WebSocket connection closed");

cljs.core.reset_BANG_(ouroboros.frontend.websocket.ws_connection,null);

if((((cljs.core.deref(ouroboros.frontend.websocket.reconnect_attempts) > (0))) && ((cljs.core.deref(ouroboros.frontend.websocket.reconnect_attempts) < ouroboros.frontend.websocket.max_reconnect_attempts)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ouroboros.frontend.websocket.reconnect_attempts,cljs.core.inc);

console.log("WebSocket reconnect attempt",cljs.core.deref(ouroboros.frontend.websocket.reconnect_attempts),"/",ouroboros.frontend.websocket.max_reconnect_attempts);

return cljs.core.reset_BANG_(ouroboros.frontend.websocket.reconnect_timeout,setTimeout(ouroboros.frontend.websocket.connect_BANG_,ouroboros.frontend.websocket.reconnect_delay_ms));
} else {
return null;
}
}));

(ws.onerror = (function (error){
return console.warn("WebSocket connection failed (backend may not be running)");
}));

return cljs.core.reset_BANG_(ouroboros.frontend.websocket.ws_connection,ws);
}catch (e40892){if((e40892 instanceof Error)){
var e = e40892;
return console.error("WebSocket connection error:",e);
} else {
throw e40892;

}
}}
});
/**
 * Close WebSocket connection
 */
ouroboros.frontend.websocket.disconnect_BANG_ = (function ouroboros$frontend$websocket$disconnect_BANG_(){
var temp__5825__auto___40978 = cljs.core.deref(ouroboros.frontend.websocket.reconnect_timeout);
if(cljs.core.truth_(temp__5825__auto___40978)){
var timeout_40980 = temp__5825__auto___40978;
clearTimeout(timeout_40980);

cljs.core.reset_BANG_(ouroboros.frontend.websocket.reconnect_timeout,null);
} else {
}

var temp__5825__auto__ = cljs.core.deref(ouroboros.frontend.websocket.ws_connection);
if(cljs.core.truth_(temp__5825__auto__)){
var ws = temp__5825__auto__;
ws.close();

cljs.core.reset_BANG_(ouroboros.frontend.websocket.ws_connection,null);

return console.log("WebSocket disconnected");
} else {
return null;
}
});
/**
 * Send message via WebSocket
 */
ouroboros.frontend.websocket.send_BANG_ = (function ouroboros$frontend$websocket$send_BANG_(message){
var temp__5825__auto__ = cljs.core.deref(ouroboros.frontend.websocket.ws_connection);
if(cljs.core.truth_(temp__5825__auto__)){
var ws = temp__5825__auto__;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ws.readyState,WebSocket.OPEN)){
return ws.send(JSON.stringify(cljs.core.clj__GT_js(message)));
} else {
return null;
}
} else {
return null;
}
});
/**
 * Send subscription/unsubscription message
 */
ouroboros.frontend.websocket.send_subscription_BANG_ = (function ouroboros$frontend$websocket$send_subscription_BANG_(type,topic){
return ouroboros.frontend.websocket.send_BANG_(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),type,new cljs.core.Keyword(null,"topic","topic",-1960480691),topic], null));
});
/**
 * Subscribe to a WebSocket topic
 */
ouroboros.frontend.websocket.subscribe_BANG_ = (function ouroboros$frontend$websocket$subscribe_BANG_(topic){
if(cljs.core.truth_((function (){var and__5000__auto__ = (ouroboros.frontend.websocket.connected_QMARK_.cljs$core$IFn$_invoke$arity$0 ? ouroboros.frontend.websocket.connected_QMARK_.cljs$core$IFn$_invoke$arity$0() : ouroboros.frontend.websocket.connected_QMARK_.call(null, ));
if(cljs.core.truth_(and__5000__auto__)){
return (!(cljs.core.contains_QMARK_(cljs.core.deref(ouroboros.frontend.websocket.subscribed_topics),topic)));
} else {
return and__5000__auto__;
}
})())){
ouroboros.frontend.websocket.send_subscription_BANG_("subscribe",topic);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(ouroboros.frontend.websocket.subscribed_topics,cljs.core.conj,topic);

return console.log("Subscribed to topic:",topic);
} else {
return null;
}
});
/**
 * Unsubscribe from a WebSocket topic
 */
ouroboros.frontend.websocket.unsubscribe_BANG_ = (function ouroboros$frontend$websocket$unsubscribe_BANG_(topic){
if(cljs.core.truth_((function (){var and__5000__auto__ = (ouroboros.frontend.websocket.connected_QMARK_.cljs$core$IFn$_invoke$arity$0 ? ouroboros.frontend.websocket.connected_QMARK_.cljs$core$IFn$_invoke$arity$0() : ouroboros.frontend.websocket.connected_QMARK_.call(null, ));
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.contains_QMARK_(cljs.core.deref(ouroboros.frontend.websocket.subscribed_topics),topic);
} else {
return and__5000__auto__;
}
})())){
ouroboros.frontend.websocket.send_subscription_BANG_("unsubscribe",topic);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(ouroboros.frontend.websocket.subscribed_topics,cljs.core.disj,topic);

return console.log("Unsubscribed from topic:",topic);
} else {
return null;
}
});
/**
 * Subscribe to builder session updates
 */
ouroboros.frontend.websocket.subscribe_builder_session_BANG_ = (function ouroboros$frontend$websocket$subscribe_builder_session_BANG_(session_id){
var topic = ["builder-session/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(session_id)].join('');
return ouroboros.frontend.websocket.subscribe_BANG_(topic);
});
/**
 * Unsubscribe from builder session updates
 */
ouroboros.frontend.websocket.unsubscribe_builder_session_BANG_ = (function ouroboros$frontend$websocket$unsubscribe_builder_session_BANG_(session_id){
var topic = ["builder-session/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(session_id)].join('');
return ouroboros.frontend.websocket.unsubscribe_BANG_(topic);
});
/**
 * Send ping to keep connection alive
 */
ouroboros.frontend.websocket.ping_BANG_ = (function ouroboros$frontend$websocket$ping_BANG_(){
return ouroboros.frontend.websocket.send_BANG_(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"ping","ping",-1670114784)], null));
});
if((typeof ouroboros !== 'undefined') && (typeof ouroboros.frontend !== 'undefined') && (typeof ouroboros.frontend.websocket !== 'undefined') && (typeof ouroboros.frontend.websocket.ping_interval !== 'undefined')){
} else {
ouroboros.frontend.websocket.ping_interval = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
/**
 * Start periodic ping to keep connection alive
 */
ouroboros.frontend.websocket.start_ping_loop_BANG_ = (function ouroboros$frontend$websocket$start_ping_loop_BANG_(){
(ouroboros.frontend.websocket.stop_ping_loop_BANG_.cljs$core$IFn$_invoke$arity$0 ? ouroboros.frontend.websocket.stop_ping_loop_BANG_.cljs$core$IFn$_invoke$arity$0() : ouroboros.frontend.websocket.stop_ping_loop_BANG_.call(null, ));

return cljs.core.reset_BANG_(ouroboros.frontend.websocket.ping_interval,setInterval(ouroboros.frontend.websocket.ping_BANG_,(30000)));
});
/**
 * Stop ping loop
 */
ouroboros.frontend.websocket.stop_ping_loop_BANG_ = (function ouroboros$frontend$websocket$stop_ping_loop_BANG_(){
var temp__5825__auto__ = cljs.core.deref(ouroboros.frontend.websocket.ping_interval);
if(cljs.core.truth_(temp__5825__auto__)){
var interval = temp__5825__auto__;
clearInterval(interval);

return cljs.core.reset_BANG_(ouroboros.frontend.websocket.ping_interval,null);
} else {
return null;
}
});
/**
 * Initialize WebSocket connection
 */
ouroboros.frontend.websocket.init_BANG_ = (function ouroboros$frontend$websocket$init_BANG_(){
ouroboros.frontend.websocket.connect_BANG_();

return ouroboros.frontend.websocket.start_ping_loop_BANG_();
});
/**
 * Clean up WebSocket connection
 */
ouroboros.frontend.websocket.destroy_BANG_ = (function ouroboros$frontend$websocket$destroy_BANG_(){
ouroboros.frontend.websocket.stop_ping_loop_BANG_();

return ouroboros.frontend.websocket.disconnect_BANG_();
});
/**
 * Check if WebSocket is connected
 */
ouroboros.frontend.websocket.connected_QMARK_ = (function ouroboros$frontend$websocket$connected_QMARK_(){
var and__5000__auto__ = cljs.core.deref(ouroboros.frontend.websocket.ws_connection);
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(ouroboros.frontend.websocket.ws_connection).readyState,WebSocket.OPEN);
} else {
return and__5000__auto__;
}
});
/**
 * Get WebSocket status
 */
ouroboros.frontend.websocket.status = (function ouroboros$frontend$websocket$status(){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"connected","connected",-169833045),ouroboros.frontend.websocket.connected_QMARK_(),new cljs.core.Keyword(null,"reconnect-attempts","reconnect-attempts",-1994972943),cljs.core.deref(ouroboros.frontend.websocket.reconnect_attempts)], null);
});

//# sourceMappingURL=ouroboros.frontend.websocket.js.map
