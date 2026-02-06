goog.provide('com.fulcrologic.fulcro.inspect.inspect_client');
goog.scope(function(){
  com.fulcrologic.fulcro.inspect.inspect_client.goog$module$goog$object = goog.module.get('goog.object');
});
/**
 * @define {boolean}
 */
com.fulcrologic.fulcro.inspect.inspect_client.INSPECT = goog.define("com.fulcrologic.fulcro.inspect.inspect_client.INSPECT",false);
if((typeof com !== 'undefined') && (typeof com.fulcrologic !== 'undefined') && (typeof com.fulcrologic.fulcro !== 'undefined') && (typeof com.fulcrologic.fulcro.inspect !== 'undefined') && (typeof com.fulcrologic.fulcro.inspect.inspect_client !== 'undefined') && (typeof com.fulcrologic.fulcro.inspect.inspect_client.run_picker !== 'undefined')){
} else {
com.fulcrologic.fulcro.inspect.inspect_client.run_picker = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof com !== 'undefined') && (typeof com.fulcrologic !== 'undefined') && (typeof com.fulcrologic.fulcro !== 'undefined') && (typeof com.fulcrologic.fulcro.inspect !== 'undefined') && (typeof com.fulcrologic.fulcro.inspect.inspect_client !== 'undefined') && (typeof com.fulcrologic.fulcro.inspect.inspect_client.started_QMARK__STAR_ !== 'undefined')){
} else {
com.fulcrologic.fulcro.inspect.inspect_client.started_QMARK__STAR_ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
}
if((typeof com !== 'undefined') && (typeof com.fulcrologic !== 'undefined') && (typeof com.fulcrologic.fulcro !== 'undefined') && (typeof com.fulcrologic.fulcro.inspect !== 'undefined') && (typeof com.fulcrologic.fulcro.inspect.inspect_client !== 'undefined') && (typeof com.fulcrologic.fulcro.inspect.inspect_client.tools_app_STAR_ !== 'undefined')){
} else {
com.fulcrologic.fulcro.inspect.inspect_client.tools_app_STAR_ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof com !== 'undefined') && (typeof com.fulcrologic !== 'undefined') && (typeof com.fulcrologic.fulcro !== 'undefined') && (typeof com.fulcrologic.fulcro.inspect !== 'undefined') && (typeof com.fulcrologic.fulcro.inspect.inspect_client !== 'undefined') && (typeof com.fulcrologic.fulcro.inspect.inspect_client.apps_STAR_ !== 'undefined')){
} else {
com.fulcrologic.fulcro.inspect.inspect_client.apps_STAR_ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
com.fulcrologic.fulcro.inspect.inspect_client.app_uuid_key = new cljs.core.Keyword("fulcro.inspect.core","app-uuid","fulcro.inspect.core/app-uuid",-1096445491);
if((typeof com !== 'undefined') && (typeof com.fulcrologic !== 'undefined') && (typeof com.fulcrologic.fulcro !== 'undefined') && (typeof com.fulcrologic.fulcro.inspect !== 'undefined') && (typeof com.fulcrologic.fulcro.inspect.inspect_client !== 'undefined') && (typeof com.fulcrologic.fulcro.inspect.inspect_client.send_ch !== 'undefined')){
} else {
com.fulcrologic.fulcro.inspect.inspect_client.send_ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.dropping_buffer((50000)));
}
com.fulcrologic.fulcro.inspect.inspect_client.post_message = (function com$fulcrologic$fulcro$inspect$inspect_client$post_message(type,data){
try{return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.inspect.inspect_client.send_ch,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,data], null));
}catch (e46668){var e = e46668;
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.inspect.inspect-client","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/inspect/inspect_client.cljc",31,16,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Cannot send to inspect. Channel closed. See https://book.fulcrologic.com/#err-inspect-ch-closed"], null);
}),null)),null,(4),null,null,null);
}});
/**
 * Returns true when env is a cljs macro &env
 */
com.fulcrologic.fulcro.inspect.inspect_client.cljs_QMARK_ = (function com$fulcrologic$fulcro$inspect$inspect_client$cljs_QMARK_(env){
return cljs.core.boolean$(new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(env));
});
/**
 * Like get, but for js objects, and in CLJC. In clj, it is just `get`. In cljs it is
 *   `gobj/get`.
 */
com.fulcrologic.fulcro.inspect.inspect_client.isoget = (function com$fulcrologic$fulcro$inspect$inspect_client$isoget(var_args){
var G__46677 = arguments.length;
switch (G__46677) {
case 2:
return com.fulcrologic.fulcro.inspect.inspect_client.isoget.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.inspect.inspect_client.isoget.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.inspect.inspect_client.isoget.cljs$core$IFn$_invoke$arity$2 = (function (obj,k){
return com.fulcrologic.fulcro.inspect.inspect_client.isoget.cljs$core$IFn$_invoke$arity$3(obj,k,null);
}));

(com.fulcrologic.fulcro.inspect.inspect_client.isoget.cljs$core$IFn$_invoke$arity$3 = (function (obj,k,default$){
var or__5002__auto__ = com.fulcrologic.fulcro.inspect.inspect_client.goog$module$goog$object.get(obj,(function (){var G__46680 = k;
if((G__46680 == null)){
return null;
} else {
return cljs.core.name(G__46680);
}
})());
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return default$;
}
}));

(com.fulcrologic.fulcro.inspect.inspect_client.isoget.cljs$lang$maxFixedArity = 3);

com.fulcrologic.fulcro.inspect.inspect_client.app_state = (function com$fulcrologic$fulcro$inspect$inspect_client$app_state(app){
var G__46681 = app;
var G__46681__$1 = (((G__46681 == null))?null:new cljs.core.Keyword("com.fulcrologic.fulcro.application","state-atom","com.fulcrologic.fulcro.application/state-atom",648128366).cljs$core$IFn$_invoke$arity$1(G__46681));
if((G__46681__$1 == null)){
return null;
} else {
return cljs.core.deref(G__46681__$1);
}
});
com.fulcrologic.fulcro.inspect.inspect_client.runtime_atom = (function com$fulcrologic$fulcro$inspect$inspect_client$runtime_atom(app){
var G__46682 = app;
if((G__46682 == null)){
return null;
} else {
return new cljs.core.Keyword("com.fulcrologic.fulcro.application","runtime-atom","com.fulcrologic.fulcro.application/runtime-atom",-1167397772).cljs$core$IFn$_invoke$arity$1(G__46682);
}
});
com.fulcrologic.fulcro.inspect.inspect_client.state_atom = (function com$fulcrologic$fulcro$inspect$inspect_client$state_atom(app){
var G__46687 = app;
if((G__46687 == null)){
return null;
} else {
return new cljs.core.Keyword("com.fulcrologic.fulcro.application","state-atom","com.fulcrologic.fulcro.application/state-atom",648128366).cljs$core$IFn$_invoke$arity$1(G__46687);
}
});
com.fulcrologic.fulcro.inspect.inspect_client.app_uuid = (function com$fulcrologic$fulcro$inspect$inspect_client$app_uuid(app){
var G__46688 = app;
var G__46688__$1 = (((G__46688 == null))?null:new cljs.core.Keyword("com.fulcrologic.fulcro.application","state-atom","com.fulcrologic.fulcro.application/state-atom",648128366).cljs$core$IFn$_invoke$arity$1(G__46688));
var G__46688__$2 = (((G__46688__$1 == null))?null:cljs.core.deref(G__46688__$1));
if((G__46688__$2 == null)){
return null;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(G__46688__$2,com.fulcrologic.fulcro.inspect.inspect_client.app_uuid_key);
}
});
com.fulcrologic.fulcro.inspect.inspect_client.remotes = (function com$fulcrologic$fulcro$inspect$inspect_client$remotes(app){
var G__46689 = com.fulcrologic.fulcro.inspect.inspect_client.runtime_atom(app);
var G__46689__$1 = (((G__46689 == null))?null:cljs.core.deref(G__46689));
if((G__46689__$1 == null)){
return null;
} else {
return new cljs.core.Keyword("com.fulcrologic.fulcro.application","remotes","com.fulcrologic.fulcro.application/remotes",1823703517).cljs$core$IFn$_invoke$arity$1(G__46689__$1);
}
});
com.fulcrologic.fulcro.inspect.inspect_client.app_id = (function com$fulcrologic$fulcro$inspect$inspect_client$app_id(app){
var G__46698 = com.fulcrologic.fulcro.inspect.inspect_client.app_state(app);
if((G__46698 == null)){
return null;
} else {
return new cljs.core.Keyword("fulcro.inspect.core","app-id","fulcro.inspect.core/app-id",-1444290233).cljs$core$IFn$_invoke$arity$1(G__46698);
}
});
com.fulcrologic.fulcro.inspect.inspect_client.fulcro_app_id = (function com$fulcrologic$fulcro$inspect$inspect_client$fulcro_app_id(app){
return new cljs.core.Keyword("com.fulcrologic.fulcro.application","id","com.fulcrologic.fulcro.application/id",-2008968625).cljs$core$IFn$_invoke$arity$1(app);
});
com.fulcrologic.fulcro.inspect.inspect_client.get_component_name = (function com$fulcrologic$fulcro$inspect$inspect_client$get_component_name(component){
if(cljs.core.truth_(component)){
var G__46699 = com.fulcrologic.fulcro.inspect.inspect_client.isoget.cljs$core$IFn$_invoke$arity$2(component,new cljs.core.Keyword(null,"fulcro$options","fulcro$options",-1332196811));
if((G__46699 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"displayName","displayName",-809144601).cljs$core$IFn$_invoke$arity$1(G__46699);
}
} else {
return null;
}
});
com.fulcrologic.fulcro.inspect.inspect_client.comp_transact_BANG_ = (function com$fulcrologic$fulcro$inspect$inspect_client$comp_transact_BANG_(app,tx,options){
var tx_BANG_ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(app,new cljs.core.Keyword(null,"tx!","tx!",-1308106263));
return (tx_BANG_.cljs$core$IFn$_invoke$arity$3 ? tx_BANG_.cljs$core$IFn$_invoke$arity$3(app,tx,options) : tx_BANG_.call(null, app,tx,options));
});
com.fulcrologic.fulcro.inspect.inspect_client.MAX_HISTORY_SIZE = (100);
/**
 * Current time in the recorded history of states
 */
com.fulcrologic.fulcro.inspect.inspect_client.current_history_id = (function com$fulcrologic$fulcro$inspect$inspect_client$current_history_id(app){
var or__5002__auto__ = new cljs.core.Keyword("com.fulcrologic.fulcro.inspect.inspect-client","time","com.fulcrologic.fulcro.inspect.inspect-client/time",-124222029).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(com.fulcrologic.fulcro.inspect.inspect_client.runtime_atom(app)));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (1);
}
});
/**
 * Record a state change in this history. Returns the ID of the newly recorded entry.
 */
com.fulcrologic.fulcro.inspect.inspect_client.record_history_entry_BANG_ = (function com$fulcrologic$fulcro$inspect$inspect_client$record_history_entry_BANG_(app,state){
var now = com.fulcrologic.fulcro.inspect.inspect_client.current_history_id(app);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.inspect.inspect_client.runtime_atom(app),(function (runtime){
var history__$1 = new cljs.core.Keyword("com.fulcrologic.fulcro.inspect.inspect-client","history","com.fulcrologic.fulcro.inspect.inspect-client/history",1397701395).cljs$core$IFn$_invoke$arity$1(runtime);
var pruned_history = (((history__$1 == null))?cljs.core.PersistentVector.EMPTY:(((cljs.core.count(history__$1) > com.fulcrologic.fulcro.inspect.inspect_client.MAX_HISTORY_SIZE))?cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(history__$1,(1)):history__$1
));
var new_history = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(pruned_history,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),now,new cljs.core.Keyword(null,"value","value",305978217),state], null));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(runtime,new cljs.core.Keyword("com.fulcrologic.fulcro.inspect.inspect-client","time","com.fulcrologic.fulcro.inspect.inspect-client/time",-124222029),(now + (1)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("com.fulcrologic.fulcro.inspect.inspect-client","history","com.fulcrologic.fulcro.inspect.inspect-client/history",1397701395),new_history], 0));
}));

return now;
});
com.fulcrologic.fulcro.inspect.inspect_client.get_history_entry = (function com$fulcrologic$fulcro$inspect$inspect_client$get_history_entry(app,id){
var history__$1 = new cljs.core.Keyword("com.fulcrologic.fulcro.inspect.inspect-client","history","com.fulcrologic.fulcro.inspect.inspect-client/history",1397701395).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(com.fulcrologic.fulcro.inspect.inspect_client.runtime_atom(app)));
var entry = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__46726){
var map__46727 = p__46726;
var map__46727__$1 = cljs.core.__destructure_map(map__46727);
var entry_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46727__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(id,entry_id);
}),cljs.core.seq(history__$1)));
return entry;
});
/**
 * Notify Inspect that the database changed
 */
com.fulcrologic.fulcro.inspect.inspect_client.db_changed_BANG_ = (function com$fulcrologic$fulcro$inspect$inspect_client$db_changed_BANG_(app,old_state,new_state){
var app_uuid = com.fulcrologic.fulcro.inspect.inspect_client.app_uuid(app);
var state_id = com.fulcrologic.fulcro.inspect.inspect_client.record_history_entry_BANG_(app,new_state);
return com.fulcrologic.fulcro.inspect.inspect_client.post_message(new cljs.core.Keyword("fulcro.inspect.client","db-changed!","fulcro.inspect.client/db-changed!",1922305221),cljs.core.PersistentArrayMap.createAsIfByAssoc([com.fulcrologic.fulcro.inspect.inspect_client.app_uuid_key,app_uuid,new cljs.core.Keyword("fulcro.inspect.client","state-id","fulcro.inspect.client/state-id",-828161304),state_id]));
});
com.fulcrologic.fulcro.inspect.inspect_client.event_data = (function com$fulcrologic$fulcro$inspect$inspect_client$event_data(event){
var G__46739 = event;
var G__46739__$1 = (((G__46739 == null))?null:com.fulcrologic.fulcro.inspect.inspect_client.goog$module$goog$object.getValueByKeys(G__46739,"data","fulcro-inspect-devtool-message"));
if((G__46739__$1 == null)){
return null;
} else {
return com.fulcrologic.fulcro.inspect.transit.read(G__46739__$1);
}
});
com.fulcrologic.fulcro.inspect.inspect_client.start_send_message_loop = (function com$fulcrologic$fulcro$inspect$inspect_client$start_send_message_loop(){
var c__38935__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__38936__auto__ = (function (){var switch__38782__auto__ = (function (state_46775){
var state_val_46776 = (state_46775[(1)]);
if((state_val_46776 === (1))){
var state_46775__$1 = state_46775;
var statearr_46782_46999 = state_46775__$1;
(statearr_46782_46999[(2)] = null);

(statearr_46782_46999[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46776 === (2))){
var state_46775__$1 = state_46775;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_46775__$1,(4),com.fulcrologic.fulcro.inspect.inspect_client.send_ch);
} else {
if((state_val_46776 === (3))){
var inst_46773 = (state_46775[(2)]);
var state_46775__$1 = state_46775;
return cljs.core.async.impl.ioc_helpers.return_chan(state_46775__$1,inst_46773);
} else {
if((state_val_46776 === (4))){
var inst_46750 = (state_46775[(7)]);
var inst_46750__$1 = (state_46775[(2)]);
var state_46775__$1 = (function (){var statearr_46786 = state_46775;
(statearr_46786[(7)] = inst_46750__$1);

return statearr_46786;
})();
if(cljs.core.truth_(inst_46750__$1)){
var statearr_46787_47002 = state_46775__$1;
(statearr_46787_47002[(1)] = (5));

} else {
var statearr_46789_47003 = state_46775__$1;
(statearr_46789_47003[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46776 === (5))){
var inst_46750 = (state_46775[(7)]);
var inst_46756 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_46750,(0),null);
var inst_46757 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_46750,(1),null);
var inst_46758 = [new cljs.core.Keyword(null,"fulcro-inspect-remote-message","fulcro-inspect-remote-message",1518065210)];
var inst_46759 = [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword(null,"timestamp","timestamp",579478971)];
var inst_46760 = (new Date());
var inst_46761 = [inst_46756,inst_46757,inst_46760];
var inst_46762 = cljs.core.PersistentHashMap.fromArrays(inst_46759,inst_46761);
var inst_46763 = com.fulcrologic.fulcro.inspect.transit.write(inst_46762);
var inst_46764 = [inst_46763];
var inst_46765 = cljs.core.PersistentHashMap.fromArrays(inst_46758,inst_46764);
var inst_46766 = cljs.core.clj__GT_js(inst_46765);
var inst_46767 = window.postMessage(inst_46766,"*");
var state_46775__$1 = (function (){var statearr_46793 = state_46775;
(statearr_46793[(8)] = inst_46767);

return statearr_46793;
})();
var statearr_46794_47006 = state_46775__$1;
(statearr_46794_47006[(2)] = null);

(statearr_46794_47006[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46776 === (6))){
var state_46775__$1 = state_46775;
var statearr_46795_47007 = state_46775__$1;
(statearr_46795_47007[(2)] = null);

(statearr_46795_47007[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_46776 === (7))){
var inst_46771 = (state_46775[(2)]);
var state_46775__$1 = state_46775;
var statearr_46796_47008 = state_46775__$1;
(statearr_46796_47008[(2)] = inst_46771);

(statearr_46796_47008[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});
return (function() {
var com$fulcrologic$fulcro$inspect$inspect_client$start_send_message_loop_$_state_machine__38783__auto__ = null;
var com$fulcrologic$fulcro$inspect$inspect_client$start_send_message_loop_$_state_machine__38783__auto____0 = (function (){
var statearr_46801 = [null,null,null,null,null,null,null,null,null];
(statearr_46801[(0)] = com$fulcrologic$fulcro$inspect$inspect_client$start_send_message_loop_$_state_machine__38783__auto__);

(statearr_46801[(1)] = (1));

return statearr_46801;
});
var com$fulcrologic$fulcro$inspect$inspect_client$start_send_message_loop_$_state_machine__38783__auto____1 = (function (state_46775){
while(true){
var ret_value__38784__auto__ = (function (){try{while(true){
var result__38785__auto__ = switch__38782__auto__(state_46775);
if(cljs.core.keyword_identical_QMARK_(result__38785__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38785__auto__;
}
break;
}
}catch (e46803){var ex__38786__auto__ = e46803;
var statearr_46804_47013 = state_46775;
(statearr_46804_47013[(2)] = ex__38786__auto__);


if(cljs.core.seq((state_46775[(4)]))){
var statearr_46805_47014 = state_46775;
(statearr_46805_47014[(1)] = cljs.core.first((state_46775[(4)])));

} else {
throw ex__38786__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38784__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__47016 = state_46775;
state_46775 = G__47016;
continue;
} else {
return ret_value__38784__auto__;
}
break;
}
});
com$fulcrologic$fulcro$inspect$inspect_client$start_send_message_loop_$_state_machine__38783__auto__ = function(state_46775){
switch(arguments.length){
case 0:
return com$fulcrologic$fulcro$inspect$inspect_client$start_send_message_loop_$_state_machine__38783__auto____0.call(this);
case 1:
return com$fulcrologic$fulcro$inspect$inspect_client$start_send_message_loop_$_state_machine__38783__auto____1.call(this,state_46775);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
com$fulcrologic$fulcro$inspect$inspect_client$start_send_message_loop_$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$0 = com$fulcrologic$fulcro$inspect$inspect_client$start_send_message_loop_$_state_machine__38783__auto____0;
com$fulcrologic$fulcro$inspect$inspect_client$start_send_message_loop_$_state_machine__38783__auto__.cljs$core$IFn$_invoke$arity$1 = com$fulcrologic$fulcro$inspect$inspect_client$start_send_message_loop_$_state_machine__38783__auto____1;
return com$fulcrologic$fulcro$inspect$inspect_client$start_send_message_loop_$_state_machine__38783__auto__;
})()
})();
var state__38937__auto__ = (function (){var statearr_46806 = f__38936__auto__();
(statearr_46806[(6)] = c__38935__auto__);

return statearr_46806;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__38937__auto__);
}));

return c__38935__auto__;
});
com.fulcrologic.fulcro.inspect.inspect_client.listen_local_messages = (function com$fulcrologic$fulcro$inspect$inspect_client$listen_local_messages(){
return window.addEventListener("message",(function (event){
if(cljs.core.truth_((function (){var and__5000__auto__ = (event.source === window);
if(and__5000__auto__){
return com.fulcrologic.fulcro.inspect.inspect_client.goog$module$goog$object.getValueByKeys(event,"data","fulcro-inspect-devtool-message");
} else {
return and__5000__auto__;
}
})())){
var G__46808 = com.fulcrologic.fulcro.inspect.inspect_client.event_data(event);
return (com.fulcrologic.fulcro.inspect.inspect_client.handle_devtool_message.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.inspect.inspect_client.handle_devtool_message.cljs$core$IFn$_invoke$arity$1(G__46808) : com.fulcrologic.fulcro.inspect.inspect_client.handle_devtool_message.call(null, G__46808));
} else {
if(cljs.core.truth_((function (){var and__5000__auto__ = (event.source === window);
if(and__5000__auto__){
return com.fulcrologic.fulcro.inspect.inspect_client.goog$module$goog$object.getValueByKeys(event,"data","fulcro-inspect-start-consume");
} else {
return and__5000__auto__;
}
})())){
return com.fulcrologic.fulcro.inspect.inspect_client.start_send_message_loop();
} else {
return null;
}
}
}),false);
});
com.fulcrologic.fulcro.inspect.inspect_client.transact_inspector_BANG_ = (function com$fulcrologic$fulcro$inspect$inspect_client$transact_inspector_BANG_(var_args){
var G__46813 = arguments.length;
switch (G__46813) {
case 1:
return com.fulcrologic.fulcro.inspect.inspect_client.transact_inspector_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.inspect.inspect_client.transact_inspector_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.inspect.inspect_client.transact_inspector_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (tx){
return com.fulcrologic.fulcro.inspect.inspect_client.post_message(new cljs.core.Keyword("fulcro.inspect.client","transact-inspector","fulcro.inspect.client/transact-inspector",-905938352),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("fulcro.inspect.client","tx","fulcro.inspect.client/tx",-815771134),tx], null));
}));

(com.fulcrologic.fulcro.inspect.inspect_client.transact_inspector_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (ref,tx){
return com.fulcrologic.fulcro.inspect.inspect_client.post_message(new cljs.core.Keyword("fulcro.inspect.client","transact-inspector","fulcro.inspect.client/transact-inspector",-905938352),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("fulcro.inspect.client","tx-ref","fulcro.inspect.client/tx-ref",-1370560773),ref,new cljs.core.Keyword("fulcro.inspect.client","tx","fulcro.inspect.client/tx",-815771134),tx], null));
}));

(com.fulcrologic.fulcro.inspect.inspect_client.transact_inspector_BANG_.cljs$lang$maxFixedArity = 2);

com.fulcrologic.fulcro.inspect.inspect_client.dispose_app = (function com$fulcrologic$fulcro$inspect$inspect_client$dispose_app(app_uuid){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(com.fulcrologic.fulcro.inspect.inspect_client.apps_STAR_,cljs.core.dissoc,app_uuid);

return com.fulcrologic.fulcro.inspect.inspect_client.post_message(new cljs.core.Keyword("fulcro.inspect.client","dispose-app","fulcro.inspect.client/dispose-app",-574872452),cljs.core.PersistentArrayMap.createAsIfByAssoc([com.fulcrologic.fulcro.inspect.inspect_client.app_uuid_key,app_uuid]));
});
com.fulcrologic.fulcro.inspect.inspect_client.set_active_app = (function com$fulcrologic$fulcro$inspect$inspect_client$set_active_app(app_uuid){
return com.fulcrologic.fulcro.inspect.inspect_client.post_message(new cljs.core.Keyword("fulcro.inspect.client","set-active-app","fulcro.inspect.client/set-active-app",-2049837528),cljs.core.PersistentArrayMap.createAsIfByAssoc([com.fulcrologic.fulcro.inspect.inspect_client.app_uuid_key,app_uuid]));
});
com.fulcrologic.fulcro.inspect.inspect_client.send_started_BANG_ = (function com$fulcrologic$fulcro$inspect$inspect_client$send_started_BANG_(app,remote,tx_id,txn){
var start = (new Date());
var app_uuid = com.fulcrologic.fulcro.inspect.inspect_client.app_uuid(app);
return com.fulcrologic.fulcro.inspect.inspect_client.transact_inspector_BANG_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("fulcro.inspect.ui.network","history-id","fulcro.inspect.ui.network/history-id",702365090),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.inspect.inspect_client.app_uuid_key,app_uuid], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Symbol("fulcro.inspect.ui.network","request-start","fulcro.inspect.ui.network/request-start",-1415257884,null),null,(1),null)),(new cljs.core.List(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("fulcro.inspect.ui.network","remote","fulcro.inspect.ui.network/remote",-307593223),remote,new cljs.core.Keyword("fulcro.inspect.ui.network","request-id","fulcro.inspect.ui.network/request-id",-2031413204),tx_id,new cljs.core.Keyword("fulcro.inspect.ui.network","request-started-at","fulcro.inspect.ui.network/request-started-at",1582455117),start,new cljs.core.Keyword("fulcro.inspect.ui.network","request-edn","fulcro.inspect.ui.network/request-edn",-1638784885),txn], null),null,(1),null)))))], null));
});
com.fulcrologic.fulcro.inspect.inspect_client.send_finished_BANG_ = (function com$fulcrologic$fulcro$inspect$inspect_client$send_finished_BANG_(app,remote,tx_id,response){
var finished = (new Date());
var app_uuid = com.fulcrologic.fulcro.inspect.inspect_client.app_uuid(app);
return com.fulcrologic.fulcro.inspect.inspect_client.transact_inspector_BANG_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("fulcro.inspect.ui.network","history-id","fulcro.inspect.ui.network/history-id",702365090),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.inspect.inspect_client.app_uuid_key,app_uuid], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Symbol("fulcro.inspect.ui.network","request-finish","fulcro.inspect.ui.network/request-finish",817834789,null),null,(1),null)),(new cljs.core.List(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("fulcro.inspect.ui.network","request-id","fulcro.inspect.ui.network/request-id",-2031413204),tx_id,new cljs.core.Keyword("fulcro.inspect.ui.network","request-finished-at","fulcro.inspect.ui.network/request-finished-at",-1848991883),finished,new cljs.core.Keyword("fulcro.inspect.ui.network","response-edn","fulcro.inspect.ui.network/response-edn",221134354),response], null),null,(1),null)))))], null));
});
com.fulcrologic.fulcro.inspect.inspect_client.send_failed_BANG_ = (function com$fulcrologic$fulcro$inspect$inspect_client$send_failed_BANG_(app,tx_id,error){
var finished = (new Date());
var app_uuid = com.fulcrologic.fulcro.inspect.inspect_client.app_uuid(app);
return com.fulcrologic.fulcro.inspect.inspect_client.transact_inspector_BANG_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("fulcro.inspect.ui.network","history-id","fulcro.inspect.ui.network/history-id",702365090),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.inspect.inspect_client.app_uuid_key,app_uuid], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Symbol("fulcro.inspect.ui.network","request-finish","fulcro.inspect.ui.network/request-finish",817834789,null),null,(1),null)),(new cljs.core.List(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("fulcro.inspect.ui.network","request-id","fulcro.inspect.ui.network/request-id",-2031413204),tx_id,new cljs.core.Keyword("fulcro.inspect.ui.network","request-finished-at","fulcro.inspect.ui.network/request-finished-at",-1848991883),finished,new cljs.core.Keyword("fulcro.inspect.ui.network","error","fulcro.inspect.ui.network/error",36212909),error], null),null,(1),null)))))], null));
});
com.fulcrologic.fulcro.inspect.inspect_client.handle_devtool_message = (function com$fulcrologic$fulcro$inspect$inspect_client$handle_devtool_message(p__46846){
var map__46847 = p__46846;
var map__46847__$1 = cljs.core.__destructure_map(map__46847);
var message = map__46847__$1;
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46847__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46847__$1,new cljs.core.Keyword(null,"data","data",-232669377));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.inspect.inspect-client","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/inspect/inspect_client.cljc",191,3,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Devtools Message received",message], null);
}),null)),null,(7),null,null,null);

var G__46849 = type;
var G__46849__$1 = (((G__46849 instanceof cljs.core.Keyword))?G__46849.fqn:null);
switch (G__46849__$1) {
case "fulcro.inspect.client/request-page-apps":
var seq__46850 = cljs.core.seq(cljs.core.vals(cljs.core.deref(com.fulcrologic.fulcro.inspect.inspect_client.apps_STAR_)));
var chunk__46851 = null;
var count__46852 = (0);
var i__46853 = (0);
while(true){
if((i__46853 < count__46852)){
var app = chunk__46851.cljs$core$IIndexed$_nth$arity$2(null, i__46853);
var state_47038 = com.fulcrologic.fulcro.inspect.inspect_client.app_state(app);
var state_id_47039 = com.fulcrologic.fulcro.inspect.inspect_client.record_history_entry_BANG_(app,state_47038);
var remote_names_47040 = com.fulcrologic.fulcro.inspect.inspect_client.remotes(app);
com.fulcrologic.fulcro.inspect.inspect_client.post_message(new cljs.core.Keyword("fulcro.inspect.client","init-app","fulcro.inspect.client/init-app",-1984595648),cljs.core.PersistentArrayMap.createAsIfByAssoc([com.fulcrologic.fulcro.inspect.inspect_client.app_uuid_key,com.fulcrologic.fulcro.inspect.inspect_client.app_uuid(app),new cljs.core.Keyword("fulcro.inspect.core","app-id","fulcro.inspect.core/app-id",-1444290233),com.fulcrologic.fulcro.inspect.inspect_client.app_id(app),new cljs.core.Keyword("fulcro.inspect.client","remotes","fulcro.inspect.client/remotes",-2062632712),cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(((function (seq__46850,chunk__46851,count__46852,i__46853,state_47038,state_id_47039,remote_names_47040,app,G__46849,G__46849__$1,map__46847,map__46847__$1,message,type,data){
return (function (p1__46843_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"remote","remote",-1593576576),p1__46843_SHARP_);
});})(seq__46850,chunk__46851,count__46852,i__46853,state_47038,state_id_47039,remote_names_47040,app,G__46849,G__46849__$1,map__46847,map__46847__$1,message,type,data))
,cljs.core.str),cljs.core.keys(remote_names_47040)),new cljs.core.Keyword("fulcro.inspect.client","initial-history-step","fulcro.inspect.client/initial-history-step",1169628321),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),state_id_47039,new cljs.core.Keyword(null,"value","value",305978217),state_47038], null)]));


var G__47048 = seq__46850;
var G__47049 = chunk__46851;
var G__47050 = count__46852;
var G__47051 = (i__46853 + (1));
seq__46850 = G__47048;
chunk__46851 = G__47049;
count__46852 = G__47050;
i__46853 = G__47051;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__46850);
if(temp__5825__auto__){
var seq__46850__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__46850__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__46850__$1);
var G__47052 = cljs.core.chunk_rest(seq__46850__$1);
var G__47053 = c__5525__auto__;
var G__47054 = cljs.core.count(c__5525__auto__);
var G__47055 = (0);
seq__46850 = G__47052;
chunk__46851 = G__47053;
count__46852 = G__47054;
i__46853 = G__47055;
continue;
} else {
var app = cljs.core.first(seq__46850__$1);
var state_47056 = com.fulcrologic.fulcro.inspect.inspect_client.app_state(app);
var state_id_47057 = com.fulcrologic.fulcro.inspect.inspect_client.record_history_entry_BANG_(app,state_47056);
var remote_names_47058 = com.fulcrologic.fulcro.inspect.inspect_client.remotes(app);
com.fulcrologic.fulcro.inspect.inspect_client.post_message(new cljs.core.Keyword("fulcro.inspect.client","init-app","fulcro.inspect.client/init-app",-1984595648),cljs.core.PersistentArrayMap.createAsIfByAssoc([com.fulcrologic.fulcro.inspect.inspect_client.app_uuid_key,com.fulcrologic.fulcro.inspect.inspect_client.app_uuid(app),new cljs.core.Keyword("fulcro.inspect.core","app-id","fulcro.inspect.core/app-id",-1444290233),com.fulcrologic.fulcro.inspect.inspect_client.app_id(app),new cljs.core.Keyword("fulcro.inspect.client","remotes","fulcro.inspect.client/remotes",-2062632712),cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(((function (seq__46850,chunk__46851,count__46852,i__46853,state_47056,state_id_47057,remote_names_47058,app,seq__46850__$1,temp__5825__auto__,G__46849,G__46849__$1,map__46847,map__46847__$1,message,type,data){
return (function (p1__46843_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"remote","remote",-1593576576),p1__46843_SHARP_);
});})(seq__46850,chunk__46851,count__46852,i__46853,state_47056,state_id_47057,remote_names_47058,app,seq__46850__$1,temp__5825__auto__,G__46849,G__46849__$1,map__46847,map__46847__$1,message,type,data))
,cljs.core.str),cljs.core.keys(remote_names_47058)),new cljs.core.Keyword("fulcro.inspect.client","initial-history-step","fulcro.inspect.client/initial-history-step",1169628321),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),state_id_47057,new cljs.core.Keyword(null,"value","value",305978217),state_47056], null)]));


var G__47064 = cljs.core.next(seq__46850__$1);
var G__47065 = null;
var G__47066 = (0);
var G__47067 = (0);
seq__46850 = G__47064;
chunk__46851 = G__47065;
count__46852 = G__47066;
i__46853 = G__47067;
continue;
}
} else {
return null;
}
}
break;
}

break;
case "fulcro.inspect.client/reset-app-state":
var map__46877 = data;
var map__46877__$1 = cljs.core.__destructure_map(map__46877);
var target_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46877__$1,new cljs.core.Keyword(null,"target-state","target-state",-682429993));
var app_uuid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46877__$1,new cljs.core.Keyword("fulcro.inspect.core","app-uuid","fulcro.inspect.core/app-uuid",-1096445491));
var temp__5823__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(com.fulcrologic.fulcro.inspect.inspect_client.apps_STAR_),app_uuid);
if(cljs.core.truth_(temp__5823__auto__)){
var app = temp__5823__auto__;
var render_BANG_ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(app,new cljs.core.Keyword(null,"schedule-render!","schedule-render!",2095050350));
if(cljs.core.truth_(new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(target_state))){
var map__46878_47072 = target_state;
var map__46878_47073__$1 = cljs.core.__destructure_map(map__46878_47072);
var id_47074 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46878_47073__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var b2__30954__auto___47075 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(com.fulcrologic.fulcro.inspect.inspect_client.apps_STAR_),app_uuid);
if(cljs.core.truth_(b2__30954__auto___47075)){
var app_47076__$1 = b2__30954__auto___47075;
var b2__30954__auto___47077__$1 = com.fulcrologic.fulcro.inspect.inspect_client.get_history_entry(app_47076__$1,id_47074);
if(cljs.core.truth_(b2__30954__auto___47077__$1)){
var map__46883_47079 = b2__30954__auto___47077__$1;
var map__46883_47080__$1 = cljs.core.__destructure_map(map__46883_47079);
var value_47081 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46883_47080__$1,new cljs.core.Keyword(null,"value","value",305978217));
cljs.core.reset_BANG_(com.fulcrologic.fulcro.inspect.inspect_client.state_atom(app_47076__$1),value_47081);
} else {
}
} else {
}
} else {
}

var G__46884 = app;
var G__46885 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"force-root?","force-root?",-1598741683),true], null);
return (render_BANG_.cljs$core$IFn$_invoke$arity$2 ? render_BANG_.cljs$core$IFn$_invoke$arity$2(G__46884,G__46885) : render_BANG_.call(null, G__46884,G__46885));
} else {
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"com.fulcrologic.fulcro.inspect.inspect-client","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/inspect/inspect_client.cljc",219,12,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Reset app on invalid uuid",app_uuid], null);
}),null)),null,(9),null,null,null);
}

break;
case "fulcro.inspect.client/fetch-history-step":
var map__46886 = data;
var map__46886__$1 = cljs.core.__destructure_map(map__46886);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46886__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var based_on = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46886__$1,new cljs.core.Keyword(null,"based-on","based-on",1217703581));
var app_uuid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46886__$1,new cljs.core.Keyword("fulcro.inspect.core","app-uuid","fulcro.inspect.core/app-uuid",-1096445491));
var b2__30954__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(com.fulcrologic.fulcro.inspect.inspect_client.apps_STAR_),app_uuid);
if(cljs.core.truth_(b2__30954__auto__)){
var app = b2__30954__auto__;
var b2__30954__auto____$1 = com.fulcrologic.fulcro.inspect.inspect_client.get_history_entry(app,id);
if(cljs.core.truth_(b2__30954__auto____$1)){
var map__46888 = b2__30954__auto____$1;
var map__46888__$1 = cljs.core.__destructure_map(map__46888);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46888__$1,new cljs.core.Keyword(null,"value","value",305978217));
var prior_state = com.fulcrologic.fulcro.inspect.inspect_client.get_history_entry(app,based_on);
var diff = (cljs.core.truth_(prior_state)?com.fulcrologic.fulcro.inspect.diff.diff(prior_state,value):null);
return com.fulcrologic.fulcro.inspect.inspect_client.post_message(new cljs.core.Keyword("fulcro.inspect.client","history-entry","fulcro.inspect.client/history-entry",1162276680),(function (){var G__46889 = cljs.core.PersistentArrayMap.createAsIfByAssoc([com.fulcrologic.fulcro.inspect.inspect_client.app_uuid_key,app_uuid,new cljs.core.Keyword("fulcro.inspect.core","state-id","fulcro.inspect.core/state-id",-89620020),id]);
var G__46889__$1 = (cljs.core.truth_(diff)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(G__46889,new cljs.core.Keyword("fulcro.inspect.client","diff","fulcro.inspect.client/diff",1522519471),diff,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"based-on","based-on",1217703581),based_on], 0)):G__46889);
if(cljs.core.not(diff)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__46889__$1,new cljs.core.Keyword("fulcro.inspect.client","state","fulcro.inspect.client/state",-1243075171),value);
} else {
return G__46889__$1;
}
})());
} else {
return null;
}
} else {
return null;
}

break;
case "fulcro.inspect.client/transact":
var map__46894 = data;
var map__46894__$1 = cljs.core.__destructure_map(map__46894);
var tx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46894__$1,new cljs.core.Keyword(null,"tx","tx",466630418));
var tx_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46894__$1,new cljs.core.Keyword(null,"tx-ref","tx-ref",-216104949));
var app_uuid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46894__$1,new cljs.core.Keyword("fulcro.inspect.core","app-uuid","fulcro.inspect.core/app-uuid",-1096445491));
var temp__5823__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(com.fulcrologic.fulcro.inspect.inspect_client.apps_STAR_),app_uuid);
if(cljs.core.truth_(temp__5823__auto__)){
var app = temp__5823__auto__;
if(cljs.core.truth_(tx_ref)){
return com.fulcrologic.fulcro.inspect.inspect_client.comp_transact_BANG_(app,tx,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ref","ref",1289896967),tx_ref], null));
} else {
return com.fulcrologic.fulcro.inspect.inspect_client.comp_transact_BANG_(app,tx,cljs.core.PersistentArrayMap.EMPTY);
}
} else {
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.inspect.inspect-client","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/inspect/inspect_client.cljc",244,12,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Transact on invalid uuid",app_uuid,"See https://book.fulcrologic.com/#err-inspect-invalid-app-uuid"], null);
}),null)),null,(10),null,null,null);
}

break;
case "fulcro.inspect.client/pick-element":
if(cljs.core.truth_(cljs.core.deref(com.fulcrologic.fulcro.inspect.inspect_client.run_picker))){
var fexpr__46899 = cljs.core.deref(com.fulcrologic.fulcro.inspect.inspect_client.run_picker);
return (fexpr__46899.cljs$core$IFn$_invoke$arity$1 ? fexpr__46899.cljs$core$IFn$_invoke$arity$1(data) : fexpr__46899.call(null, data));
} else {
try{return alert("Element picker not installed. Add it to your preload.");
}catch (e46900){var _e = e46900;
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.inspect.inspect-client","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/inspect/inspect_client.cljc",252,14,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Element picker not installed in app. You must add it to you preloads. See https://book.fulcrologic.com/#err-inspect-elm-picker-missing"], null);
}),null)),null,(11),null,null,null);
}}

break;
case "fulcro.inspect.client/network-request":
var map__46901 = data;
var map__46901__$1 = cljs.core.__destructure_map(map__46901);
var remote_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46901__$1,new cljs.core.Keyword("fulcro.inspect.client","remote","fulcro.inspect.client/remote",-306964848));
var query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46901__$1,new cljs.core.Keyword(null,"query","query",-1288509510));
var mutation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46901__$1,new cljs.core.Keyword(null,"mutation","mutation",-285823378));
var msg_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46901__$1,new cljs.core.Keyword("fulcro.inspect.ui-parser","msg-id","fulcro.inspect.ui-parser/msg-id",-467621998));
var app_uuid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46901__$1,new cljs.core.Keyword("fulcro.inspect.core","app-uuid","fulcro.inspect.core/app-uuid",-1096445491));
var b2__30954__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(com.fulcrologic.fulcro.inspect.inspect_client.apps_STAR_),app_uuid);
if(cljs.core.truth_(b2__30954__auto__)){
var app = b2__30954__auto__;
var b2__30954__auto____$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.inspect.inspect_client.remotes(app),remote_name);
if(cljs.core.truth_(b2__30954__auto____$1)){
var remote = b2__30954__auto____$1;
var b2__30954__auto____$2 = new cljs.core.Keyword(null,"transmit!","transmit!",-107149039).cljs$core$IFn$_invoke$arity$1(remote);
if(cljs.core.truth_(b2__30954__auto____$2)){
var transmit_BANG_ = b2__30954__auto____$2;
var b2__30954__auto____$3 = edn_query_language.core.query__GT_ast((function (){var or__5002__auto__ = query;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return mutation;
}
})());
if(cljs.core.truth_(b2__30954__auto____$3)){
var ast = b2__30954__auto____$3;
var b2__30954__auto____$4 = cljs.core.random_uuid();
if(cljs.core.truth_(b2__30954__auto____$4)){
var tx_id = b2__30954__auto____$4;
com.fulcrologic.fulcro.inspect.inspect_client.send_started_BANG_(app,remote_name,tx_id,(function (){var or__5002__auto__ = query;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return mutation;
}
})());

var G__46906 = remote;
var G__46907 = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","id","com.fulcrologic.fulcro.algorithms.tx-processing/id",1199810423),tx_id,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","ast","com.fulcrologic.fulcro.algorithms.tx-processing/ast",1718830373),ast,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","idx","com.fulcrologic.fulcro.algorithms.tx-processing/idx",-1121773698),(0),new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","options","com.fulcrologic.fulcro.algorithms.tx-processing/options",2016767420),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","update-handler","com.fulcrologic.fulcro.algorithms.tx-processing/update-handler",-1256285755),cljs.core.identity,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","result-handler","com.fulcrologic.fulcro.algorithms.tx-processing/result-handler",-114902209),(function (p__46916){
var map__46917 = p__46916;
var map__46917__$1 = cljs.core.__destructure_map(map__46917);
var result = map__46917__$1;
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46917__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var error_QMARK__47104 = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(app,new cljs.core.Keyword(null,"remote-error?","remote-error?",-391127497));
if(cljs.core.truth_((error_QMARK__47104.cljs$core$IFn$_invoke$arity$1 ? error_QMARK__47104.cljs$core$IFn$_invoke$arity$1(result) : error_QMARK__47104.call(null, result)))){
com.fulcrologic.fulcro.inspect.inspect_client.send_failed_BANG_(app,tx_id,result);
} else {
com.fulcrologic.fulcro.inspect.inspect_client.send_finished_BANG_(app,remote_name,tx_id,body);
}

return com.fulcrologic.fulcro.inspect.inspect_client.post_message(new cljs.core.Keyword("fulcro.inspect.client","message-response","fulcro.inspect.client/message-response",587955053),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("fulcro.inspect.ui-parser","msg-id","fulcro.inspect.ui-parser/msg-id",-467621998),msg_id,new cljs.core.Keyword("fulcro.inspect.ui-parser","msg-response","fulcro.inspect.ui-parser/msg-response",1721295840),body], null));
})], null);
return (transmit_BANG_.cljs$core$IFn$_invoke$arity$2 ? transmit_BANG_.cljs$core$IFn$_invoke$arity$2(G__46906,G__46907) : transmit_BANG_.call(null, G__46906,G__46907));
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}

break;
case "fulcro.inspect.client/console-log":
var map__46924 = data;
var map__46924__$1 = cljs.core.__destructure_map(map__46924);
var log = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46924__$1,new cljs.core.Keyword(null,"log","log",-1595516004));
var log_js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46924__$1,new cljs.core.Keyword(null,"log-js","log-js",-1565471667));
var warn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46924__$1,new cljs.core.Keyword(null,"warn","warn",-436710552));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46924__$1,new cljs.core.Keyword(null,"error","error",-978969032));
if(cljs.core.truth_(log)){
return console.log(log);
} else {
if(cljs.core.truth_(log_js)){
return console.log(cljs.core.clj__GT_js(log_js));
} else {
if(cljs.core.truth_(warn)){
return console.warn(warn);
} else {
if(cljs.core.truth_(error)){
return console.error(error);
} else {
return null;
}
}
}
}

break;
case "fulcro.inspect.client/check-client-version":
return com.fulcrologic.fulcro.inspect.inspect_client.post_message(new cljs.core.Keyword("fulcro.inspect.client","client-version","fulcro.inspect.client/client-version",728119531),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"version","version",425292698),"3.0.0"], null));

break;
default:
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.inspect.inspect-client","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/inspect/inspect_client.cljc",316,8,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Unknown message",type], null);
}),null)),null,(12),null,null,null);

}
});
com.fulcrologic.fulcro.inspect.inspect_client.install = (function com$fulcrologic$fulcro$inspect$inspect_client$install(_){
document.documentElement.setAttribute("__fulcro-inspect-remote-installed__",true);

if(cljs.core.truth_(cljs.core.deref(com.fulcrologic.fulcro.inspect.inspect_client.started_QMARK__STAR_))){
return null;
} else {
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"com.fulcrologic.fulcro.inspect.inspect-client","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/inspect/inspect_client.cljc",325,10,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Installing Fulcro 3.x Inspect",cljs.core.PersistentArrayMap.EMPTY], null);
}),null)),null,(13),null,null,null);

cljs.core.reset_BANG_(com.fulcrologic.fulcro.inspect.inspect_client.started_QMARK__STAR_,true);

return com.fulcrologic.fulcro.inspect.inspect_client.listen_local_messages();
}
});
/**
 * Register the application with Inspect, if it is available.
 */
com.fulcrologic.fulcro.inspect.inspect_client.app_started_BANG_ = (function com$fulcrologic$fulcro$inspect$inspect_client$app_started_BANG_(app){
if(cljs.core.truth_((function (){var and__5000__auto__ = (function (){var or__5002__auto__ = goog.DEBUG;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return com.fulcrologic.fulcro.inspect.inspect_client.INSPECT;
}
})();
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("disabled",com.fulcrologic.fulcro.inspect.inspect_client.INSPECT);
} else {
return and__5000__auto__;
}
})())){
var networking = com.fulcrologic.fulcro.inspect.inspect_client.remotes(app);
var state_STAR_ = com.fulcrologic.fulcro.inspect.inspect_client.state_atom(app);
var app_uuid = com.fulcrologic.fulcro.inspect.inspect_client.fulcro_app_id(app);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(com.fulcrologic.fulcro.inspect.inspect_client.apps_STAR_,cljs.core.assoc,app_uuid,app);

com.fulcrologic.fulcro.inspect.inspect_client.record_history_entry_BANG_(app,cljs.core.deref(state_STAR_));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_STAR_,cljs.core.assoc,com.fulcrologic.fulcro.inspect.inspect_client.app_uuid_key,app_uuid);

com.fulcrologic.fulcro.inspect.inspect_client.post_message(new cljs.core.Keyword("fulcro.inspect.client","init-app","fulcro.inspect.client/init-app",-1984595648),cljs.core.PersistentArrayMap.createAsIfByAssoc([com.fulcrologic.fulcro.inspect.inspect_client.app_uuid_key,app_uuid,new cljs.core.Keyword("fulcro.inspect.core","app-id","fulcro.inspect.core/app-id",-1444290233),com.fulcrologic.fulcro.inspect.inspect_client.app_id(app),new cljs.core.Keyword("fulcro.inspect.client","remotes","fulcro.inspect.client/remotes",-2062632712),cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2((function (p1__46936_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"remote","remote",-1593576576),p1__46936_SHARP_);
}),cljs.core.str),cljs.core.keys(networking)),new cljs.core.Keyword("fulcro.inspect.client","initial-state","fulcro.inspect.client/initial-state",1225829482),cljs.core.deref(state_STAR_)]));

return cljs.core.add_watch(state_STAR_,app_uuid,(function (p1__46939_SHARP_,p2__46940_SHARP_,p3__46937_SHARP_,p4__46938_SHARP_){
return com.fulcrologic.fulcro.inspect.inspect_client.db_changed_BANG_(app,p3__46937_SHARP_,p4__46938_SHARP_);
}));
} else {
return null;
}
});
/**
 * Notify inspect that a transaction finished.
 * 
 * app - The app
 * env - The mutation env that completed.
 */
com.fulcrologic.fulcro.inspect.inspect_client.optimistic_action_finished_BANG_ = (function com$fulcrologic$fulcro$inspect$inspect_client$optimistic_action_finished_BANG_(app,p__46945,p__46946){
var map__46948 = p__46945;
var map__46948__$1 = cljs.core.__destructure_map(map__46948);
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46948__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46948__$1,new cljs.core.Keyword(null,"ref","ref",1289896967));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46948__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var options = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46948__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","options","com.fulcrologic.fulcro.algorithms.tx-processing/options",2016767420));
var map__46949 = p__46946;
var map__46949__$1 = cljs.core.__destructure_map(map__46949);
var tx_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46949__$1,new cljs.core.Keyword(null,"tx-id","tx-id",638275288));
var tx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46949__$1,new cljs.core.Keyword(null,"tx","tx",466630418));
var state_id_before = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46949__$1,new cljs.core.Keyword(null,"state-id-before","state-id-before",-1436953055));
var db_before = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46949__$1,new cljs.core.Keyword(null,"db-before","db-before",-553691536));
var db_after = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46949__$1,new cljs.core.Keyword(null,"db-after","db-after",-571884666));
var component_name = com.fulcrologic.fulcro.inspect.inspect_client.get_component_name(component);
var current_id = com.fulcrologic.fulcro.inspect.inspect_client.current_history_id(app);
var tx__$1 = (function (){var G__46953 = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("fulcro.inspect.ui.transactions","tx-id","fulcro.inspect.ui.transactions/tx-id",315271198),tx_id,new cljs.core.Keyword("fulcro.history","client-time","fulcro.history/client-time",1879420278),(new Date()),new cljs.core.Keyword("fulcro.history","tx","fulcro.history/tx",1485693993),tx,new cljs.core.Keyword("fulcro.history","db-before-id","fulcro.history/db-before-id",1439381422),state_id_before,new cljs.core.Keyword("fulcro.history","db-after-id","fulcro.history/db-after-id",1928976932),current_id,new cljs.core.Keyword("fulcro.history","network-sends","fulcro.history/network-sends",-234790789),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","options","com.fulcrologic.fulcro.algorithms.tx-processing/options",2016767420),options], null);
var G__46953__$1 = (cljs.core.truth_(component_name)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__46953,new cljs.core.Keyword(null,"component","component",1555936782),component_name):G__46953);
if(cljs.core.truth_(ref)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__46953__$1,new cljs.core.Keyword(null,"ident-ref","ident-ref",663643478),ref);
} else {
return G__46953__$1;
}
})();
var app_uuid = com.fulcrologic.fulcro.inspect.inspect_client.app_uuid(app);
return com.fulcrologic.fulcro.inspect.inspect_client.post_message(new cljs.core.Keyword("fulcro.inspect.client","new-client-transaction","fulcro.inspect.client/new-client-transaction",-1086637148),cljs.core.PersistentArrayMap.createAsIfByAssoc([com.fulcrologic.fulcro.inspect.inspect_client.app_uuid_key,app_uuid,new cljs.core.Keyword("fulcro.inspect.client","tx","fulcro.inspect.client/tx",-815771134),tx__$1]));
});

//# sourceMappingURL=com.fulcrologic.fulcro.inspect.inspect_client.js.map
