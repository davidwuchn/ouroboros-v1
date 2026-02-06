goog.provide('com.fulcrologic.fulcro.rendering.multiple_roots_renderer');
goog.scope(function(){
  com.fulcrologic.fulcro.rendering.multiple_roots_renderer.goog$module$goog$object = goog.module.get('goog.object');
});
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
/**
 * DEPRECATED: Floating roots can now be created with React hooks and hooks/use-component or hooks/use-fulcro.
 * 
 *   Register a mounted react component as a new root that should be managed. The
 *   options map can contain:
 * 
 *   - `:initialize?`: Should the initial state be pushed into the app state (if not already present)? Defaults
 *   to true, which causes it to happen once (on initial mount).
 */
com.fulcrologic.fulcro.rendering.multiple_roots_renderer.register_root_BANG_ = (function com$fulcrologic$fulcro$rendering$multiple_roots_renderer$register_root_BANG_(var_args){
var G__56803 = arguments.length;
switch (G__56803) {
case 1:
return com.fulcrologic.fulcro.rendering.multiple_roots_renderer.register_root_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.rendering.multiple_roots_renderer.register_root_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.rendering.multiple_roots_renderer.register_root_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (react_instance){
return com.fulcrologic.fulcro.rendering.multiple_roots_renderer.register_root_BANG_.cljs$core$IFn$_invoke$arity$2(react_instance,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"initialize?","initialize?",-1238334118),true], null));
}));

(com.fulcrologic.fulcro.rendering.multiple_roots_renderer.register_root_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (react_instance,p__56812){
var map__56813 = p__56812;
var map__56813__$1 = cljs.core.__destructure_map(map__56813);
var app = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56813__$1,new cljs.core.Keyword(null,"app","app",-560961707));
var initialize_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56813__$1,new cljs.core.Keyword(null,"initialize?","initialize?",-1238334118));
var app__$1 = (function (){var or__5002__auto__ = app;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = com.fulcrologic.fulcro.components.any__GT_app(react_instance);
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
return com.fulcrologic.fulcro.components._STAR_app_STAR_;
}
}
})();
if(cljs.core.map_QMARK_(app__$1)){
var class$ = com.fulcrologic.fulcro.components.react_type(react_instance);
var k = (com.fulcrologic.fulcro.components.class__GT_registry_key.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.class__GT_registry_key.cljs$core$IFn$_invoke$arity$1(class$) : com.fulcrologic.fulcro.components.class__GT_registry_key.call(null, class$));
var initialize_state_BANG_ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(app__$1,new cljs.core.Keyword(null,"initialize-state!","initialize-state!",-1114074844));
var schedule_render_BANG_ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(app__$1,new cljs.core.Keyword(null,"schedule-render!","schedule-render!",2095050350));
var known_roots = (function (){var G__56820 = app__$1;
var G__56820__$1 = (((G__56820 == null))?null:new cljs.core.Keyword("com.fulcrologic.fulcro.application","runtime-atom","com.fulcrologic.fulcro.application/runtime-atom",-1167397772).cljs$core$IFn$_invoke$arity$1(G__56820));
var G__56820__$2 = (((G__56820__$1 == null))?null:cljs.core.deref(G__56820__$1));
if((G__56820__$2 == null)){
return null;
} else {
return new cljs.core.Keyword("com.fulcrologic.fulcro.rendering.multiple-roots-renderer","known-roots","com.fulcrologic.fulcro.rendering.multiple-roots-renderer/known-roots",1422774853).cljs$core$IFn$_invoke$arity$1(G__56820__$2);
}
})();
var initialized_QMARK_ = cljs.core.contains_QMARK_(known_roots,k);
if(cljs.core.truth_((function (){var and__5000__auto__ = initialize_QMARK_;
if(cljs.core.truth_(and__5000__auto__)){
return (!(initialized_QMARK_));
} else {
return and__5000__auto__;
}
})())){
(initialize_state_BANG_.cljs$core$IFn$_invoke$arity$2 ? initialize_state_BANG_.cljs$core$IFn$_invoke$arity$2(app__$1,class$) : initialize_state_BANG_.call(null, app__$1,class$));

var G__56825_57099 = app__$1;
var G__56827_57100 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"force-root?","force-root?",-1598741683),true], null);
(schedule_render_BANG_.cljs$core$IFn$_invoke$arity$2 ? schedule_render_BANG_.cljs$core$IFn$_invoke$arity$2(G__56825_57099,G__56827_57100) : schedule_render_BANG_.call(null, G__56825_57099,G__56827_57100));
} else {
}

taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.rendering.multiple-roots-renderer","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/rendering/multiple_roots_renderer.cljc",94,10,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Adding root of type ",k], null);
}),null)),null,(336),null,null,null);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("com.fulcrologic.fulcro.application","runtime-atom","com.fulcrologic.fulcro.application/runtime-atom",-1167397772).cljs$core$IFn$_invoke$arity$1(app__$1),cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.rendering.multiple-roots-renderer","known-roots","com.fulcrologic.fulcro.rendering.multiple-roots-renderer/known-roots",1422774853),k], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([react_instance], 0));
} else {
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.rendering.multiple-roots-renderer","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/rendering/multiple_roots_renderer.cljc",96,8,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Register-root cannot find app. Pass your Fulcro app via options. See https://book.fulcrologic.com/#err-mrr-reg-root-no-app"], null);
}),null)),null,(337),null,null,null);
}
}));

(com.fulcrologic.fulcro.rendering.multiple_roots_renderer.register_root_BANG_.cljs$lang$maxFixedArity = 2);

/**
 * Deregister a mounted root that should no longer be managed.
 */
com.fulcrologic.fulcro.rendering.multiple_roots_renderer.deregister_root_BANG_ = (function com$fulcrologic$fulcro$rendering$multiple_roots_renderer$deregister_root_BANG_(var_args){
var G__56835 = arguments.length;
switch (G__56835) {
case 1:
return com.fulcrologic.fulcro.rendering.multiple_roots_renderer.deregister_root_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.rendering.multiple_roots_renderer.deregister_root_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.rendering.multiple_roots_renderer.deregister_root_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (react_instance){
return com.fulcrologic.fulcro.rendering.multiple_roots_renderer.deregister_root_BANG_.cljs$core$IFn$_invoke$arity$2(react_instance,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.rendering.multiple_roots_renderer.deregister_root_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (react_instance,p__56840){
var map__56844 = p__56840;
var map__56844__$1 = cljs.core.__destructure_map(map__56844);
var options = map__56844__$1;
var app = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56844__$1,new cljs.core.Keyword(null,"app","app",-560961707));
var app__$1 = (function (){var or__5002__auto__ = app;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = com.fulcrologic.fulcro.components.any__GT_app(react_instance);
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
return com.fulcrologic.fulcro.components._STAR_app_STAR_;
}
}
})();
if(cljs.core.map_QMARK_(app__$1)){
var class$ = com.fulcrologic.fulcro.components.react_type(react_instance);
var k = (com.fulcrologic.fulcro.components.class__GT_registry_key.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.class__GT_registry_key.cljs$core$IFn$_invoke$arity$1(class$) : com.fulcrologic.fulcro.components.class__GT_registry_key.call(null, class$));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"com.fulcrologic.fulcro.rendering.multiple-roots-renderer","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/rendering/multiple_roots_renderer.cljc",107,10,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Adding root of type ",k], null);
}),null)),null,(340),null,null,null);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("com.fulcrologic.fulcro.application","runtime-atom","com.fulcrologic.fulcro.application/runtime-atom",-1167397772).cljs$core$IFn$_invoke$arity$1(app__$1),cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.rendering.multiple-roots-renderer","known-roots","com.fulcrologic.fulcro.rendering.multiple-roots-renderer/known-roots",1422774853),k], null),cljs.core.disj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([react_instance], 0));
} else {
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.rendering.multiple-roots-renderer","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/rendering/multiple_roots_renderer.cljc",109,8,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Deregister-root cannot find app. Pass your Fulcro app via options. See https://book.fulcrologic.com/#err-mrr-dereg-root-no-app"], null);
}),null)),null,(341),null,null,null);
}
}));

(com.fulcrologic.fulcro.rendering.multiple_roots_renderer.deregister_root_BANG_.cljs$lang$maxFixedArity = 2);

com.fulcrologic.fulcro.rendering.multiple_roots_renderer.render_roots_BANG_ = (function com$fulcrologic$fulcro$rendering$multiple_roots_renderer$render_roots_BANG_(app,options){
var state_map = (function (){var G__56864 = app;
var G__56864__$1 = (((G__56864 == null))?null:new cljs.core.Keyword("com.fulcrologic.fulcro.application","state-atom","com.fulcrologic.fulcro.application/state-atom",648128366).cljs$core$IFn$_invoke$arity$1(G__56864));
if((G__56864__$1 == null)){
return null;
} else {
return cljs.core.deref(G__56864__$1);
}
})();
var known_roots = (function (){var G__56865 = app;
var G__56865__$1 = (((G__56865 == null))?null:new cljs.core.Keyword("com.fulcrologic.fulcro.application","runtime-atom","com.fulcrologic.fulcro.application/runtime-atom",-1167397772).cljs$core$IFn$_invoke$arity$1(G__56865));
var G__56865__$2 = (((G__56865__$1 == null))?null:cljs.core.deref(G__56865__$1));
if((G__56865__$2 == null)){
return null;
} else {
return new cljs.core.Keyword("com.fulcrologic.fulcro.rendering.multiple-roots-renderer","known-roots","com.fulcrologic.fulcro.rendering.multiple-roots-renderer/known-roots",1422774853).cljs$core$IFn$_invoke$arity$1(G__56865__$2);
}
})();
com.fulcrologic.fulcro.rendering.keyframe_render.render_BANG_(app,options);

var seq__56868 = cljs.core.seq(cljs.core.keys(known_roots));
var chunk__56870 = null;
var count__56871 = (0);
var i__56872 = (0);
while(true){
if((i__56872 < count__56871)){
var k = chunk__56870.cljs$core$IIndexed$_nth$arity$2(null, i__56872);
var cls_57121 = (com.fulcrologic.fulcro.components.registry_key__GT_class.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.registry_key__GT_class.cljs$core$IFn$_invoke$arity$1(k) : com.fulcrologic.fulcro.components.registry_key__GT_class.call(null, k));
var query_57122 = com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$2(cls_57121,state_map);
var root_props_57123 = com.fulcrologic.fulcro.algorithms.denormalize.db__GT_tree(query_57122,state_map,state_map);
var seq__56916_57124 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$2(known_roots,k));
var chunk__56917_57125 = null;
var count__56918_57126 = (0);
var i__56919_57127 = (0);
while(true){
if((i__56919_57127 < count__56918_57126)){
var root_57128 = chunk__56917_57125.cljs$core$IIndexed$_nth$arity$2(null, i__56919_57127);
com.fulcrologic.fulcro.components.tunnel_props_BANG_(root_57128,root_props_57123);


var G__57129 = seq__56916_57124;
var G__57130 = chunk__56917_57125;
var G__57131 = count__56918_57126;
var G__57132 = (i__56919_57127 + (1));
seq__56916_57124 = G__57129;
chunk__56917_57125 = G__57130;
count__56918_57126 = G__57131;
i__56919_57127 = G__57132;
continue;
} else {
var temp__5825__auto___57133 = cljs.core.seq(seq__56916_57124);
if(temp__5825__auto___57133){
var seq__56916_57134__$1 = temp__5825__auto___57133;
if(cljs.core.chunked_seq_QMARK_(seq__56916_57134__$1)){
var c__5525__auto___57135 = cljs.core.chunk_first(seq__56916_57134__$1);
var G__57136 = cljs.core.chunk_rest(seq__56916_57134__$1);
var G__57137 = c__5525__auto___57135;
var G__57138 = cljs.core.count(c__5525__auto___57135);
var G__57139 = (0);
seq__56916_57124 = G__57136;
chunk__56917_57125 = G__57137;
count__56918_57126 = G__57138;
i__56919_57127 = G__57139;
continue;
} else {
var root_57141 = cljs.core.first(seq__56916_57134__$1);
com.fulcrologic.fulcro.components.tunnel_props_BANG_(root_57141,root_props_57123);


var G__57143 = cljs.core.next(seq__56916_57134__$1);
var G__57144 = null;
var G__57145 = (0);
var G__57146 = (0);
seq__56916_57124 = G__57143;
chunk__56917_57125 = G__57144;
count__56918_57126 = G__57145;
i__56919_57127 = G__57146;
continue;
}
} else {
}
}
break;
}


var G__57149 = seq__56868;
var G__57150 = chunk__56870;
var G__57151 = count__56871;
var G__57152 = (i__56872 + (1));
seq__56868 = G__57149;
chunk__56870 = G__57150;
count__56871 = G__57151;
i__56872 = G__57152;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__56868);
if(temp__5825__auto__){
var seq__56868__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__56868__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__56868__$1);
var G__57154 = cljs.core.chunk_rest(seq__56868__$1);
var G__57155 = c__5525__auto__;
var G__57156 = cljs.core.count(c__5525__auto__);
var G__57157 = (0);
seq__56868 = G__57154;
chunk__56870 = G__57155;
count__56871 = G__57156;
i__56872 = G__57157;
continue;
} else {
var k = cljs.core.first(seq__56868__$1);
var cls_57158 = (com.fulcrologic.fulcro.components.registry_key__GT_class.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.registry_key__GT_class.cljs$core$IFn$_invoke$arity$1(k) : com.fulcrologic.fulcro.components.registry_key__GT_class.call(null, k));
var query_57159 = com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$2(cls_57158,state_map);
var root_props_57160 = com.fulcrologic.fulcro.algorithms.denormalize.db__GT_tree(query_57159,state_map,state_map);
var seq__56936_57162 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$2(known_roots,k));
var chunk__56937_57163 = null;
var count__56938_57164 = (0);
var i__56939_57165 = (0);
while(true){
if((i__56939_57165 < count__56938_57164)){
var root_57166 = chunk__56937_57163.cljs$core$IIndexed$_nth$arity$2(null, i__56939_57165);
com.fulcrologic.fulcro.components.tunnel_props_BANG_(root_57166,root_props_57160);


var G__57167 = seq__56936_57162;
var G__57168 = chunk__56937_57163;
var G__57169 = count__56938_57164;
var G__57170 = (i__56939_57165 + (1));
seq__56936_57162 = G__57167;
chunk__56937_57163 = G__57168;
count__56938_57164 = G__57169;
i__56939_57165 = G__57170;
continue;
} else {
var temp__5825__auto___57171__$1 = cljs.core.seq(seq__56936_57162);
if(temp__5825__auto___57171__$1){
var seq__56936_57172__$1 = temp__5825__auto___57171__$1;
if(cljs.core.chunked_seq_QMARK_(seq__56936_57172__$1)){
var c__5525__auto___57173 = cljs.core.chunk_first(seq__56936_57172__$1);
var G__57175 = cljs.core.chunk_rest(seq__56936_57172__$1);
var G__57176 = c__5525__auto___57173;
var G__57177 = cljs.core.count(c__5525__auto___57173);
var G__57178 = (0);
seq__56936_57162 = G__57175;
chunk__56937_57163 = G__57176;
count__56938_57164 = G__57177;
i__56939_57165 = G__57178;
continue;
} else {
var root_57182 = cljs.core.first(seq__56936_57172__$1);
com.fulcrologic.fulcro.components.tunnel_props_BANG_(root_57182,root_props_57160);


var G__57183 = cljs.core.next(seq__56936_57172__$1);
var G__57184 = null;
var G__57185 = (0);
var G__57186 = (0);
seq__56936_57162 = G__57183;
chunk__56937_57163 = G__57184;
count__56938_57164 = G__57185;
i__56939_57165 = G__57186;
continue;
}
} else {
}
}
break;
}


var G__57188 = cljs.core.next(seq__56868__$1);
var G__57189 = null;
var G__57190 = (0);
var G__57191 = (0);
seq__56868 = G__57188;
chunk__56870 = G__57189;
count__56871 = G__57190;
i__56872 = G__57191;
continue;
}
} else {
return null;
}
}
break;
}
});
/**
 * This function tracks the state of the app at the time of prior render in the app's runtime-atom. It
 * uses that to do a comparison of old vs. current application state (bounded by the needs of on-screen components).
 * When it finds data that has changed it renders all of the components that depend on that data.
 */
com.fulcrologic.fulcro.rendering.multiple_roots_renderer.render_stale_components_BANG_ = (function com$fulcrologic$fulcro$rendering$multiple_roots_renderer$render_stale_components_BANG_(app,options){
var map__56955 = app;
var map__56955__$1 = cljs.core.__destructure_map(map__56955);
var runtime_atom = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56955__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","runtime-atom","com.fulcrologic.fulcro.application/runtime-atom",-1167397772));
var map__56956 = cljs.core.deref(runtime_atom);
var map__56956__$1 = cljs.core.__destructure_map(map__56956);
var only_refresh = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56956__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","only-refresh","com.fulcrologic.fulcro.application/only-refresh",1300408206));
var limited_refresh_QMARK_ = cljs.core.seq(only_refresh);
if(limited_refresh_QMARK_){
var map__56957 = cljs.core.group_by(edn_query_language.core.ident_QMARK_,only_refresh);
var map__56957__$1 = cljs.core.__destructure_map(map__56957);
var limited_idents = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56957__$1,true);
var seq__56962 = cljs.core.seq(limited_idents);
var chunk__56963 = null;
var count__56964 = (0);
var i__56965 = (0);
while(true){
if((i__56965 < count__56964)){
var i = chunk__56963.cljs$core$IIndexed$_nth$arity$2(null, i__56965);
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_components_with_ident_BANG_(app,i);


var G__57201 = seq__56962;
var G__57202 = chunk__56963;
var G__57203 = count__56964;
var G__57204 = (i__56965 + (1));
seq__56962 = G__57201;
chunk__56963 = G__57202;
count__56964 = G__57203;
i__56965 = G__57204;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__56962);
if(temp__5825__auto__){
var seq__56962__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__56962__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__56962__$1);
var G__57206 = cljs.core.chunk_rest(seq__56962__$1);
var G__57207 = c__5525__auto__;
var G__57208 = cljs.core.count(c__5525__auto__);
var G__57209 = (0);
seq__56962 = G__57206;
chunk__56963 = G__57207;
count__56964 = G__57208;
i__56965 = G__57209;
continue;
} else {
var i = cljs.core.first(seq__56962__$1);
com.fulcrologic.fulcro.rendering.ident_optimized_render.render_components_with_ident_BANG_(app,i);


var G__57212 = cljs.core.next(seq__56962__$1);
var G__57213 = null;
var G__57214 = (0);
var G__57215 = (0);
seq__56962 = G__57212;
chunk__56963 = G__57213;
count__56964 = G__57214;
i__56965 = G__57215;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return com.fulcrologic.fulcro.rendering.multiple_roots_renderer.render_roots_BANG_(app,options);
}
});
/**
 * DEPRECATED: Floating roots can now be created with React hooks and hooks/use-component or hooks/use-fulcro.
 * 
 * The top-level call for using this optimized render in your application.
 * 
 * If `:force-root? true` is passed in options, then it just forces a keyframe root render.
 * 
 * This renderer always does a keyframe render *unless* an `:only-refresh` option is passed to the stack
 * (usually as an option on `(transact! this [(f)] {:only-refresh [...idents...]})`. In that case the renderer
 * will ignore *all* data diffing and will target refresh only to the on-screen components that have the listed
 * ident(s). This allows you to get component-local state refresh rates on transactions that are responding to
 * events that should really only affect a known set of components (like the input field).
 * 
 * This option does *not* currently support using query keywords in the refresh set. Only idents.
 */
com.fulcrologic.fulcro.rendering.multiple_roots_renderer.render_BANG_ = (function com$fulcrologic$fulcro$rendering$multiple_roots_renderer$render_BANG_(var_args){
var G__56989 = arguments.length;
switch (G__56989) {
case 1:
return com.fulcrologic.fulcro.rendering.multiple_roots_renderer.render_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.rendering.multiple_roots_renderer.render_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.rendering.multiple_roots_renderer.render_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (app){
return com.fulcrologic.fulcro.rendering.multiple_roots_renderer.render_BANG_.cljs$core$IFn$_invoke$arity$2(app,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.rendering.multiple_roots_renderer.render_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (app,p__56998){
var map__56999 = p__56998;
var map__56999__$1 = cljs.core.__destructure_map(map__56999);
var options = map__56999__$1;
var force_root_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56999__$1,new cljs.core.Keyword(null,"force-root?","force-root?",-1598741683));
var root_props_changed_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56999__$1,new cljs.core.Keyword(null,"root-props-changed?","root-props-changed?",1999614835));
if(cljs.core.truth_((function (){var or__5002__auto__ = force_root_QMARK_;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return root_props_changed_QMARK_;
}
})())){
return com.fulcrologic.fulcro.rendering.multiple_roots_renderer.render_roots_BANG_(app,options);
} else {
try{return com.fulcrologic.fulcro.rendering.multiple_roots_renderer.render_stale_components_BANG_(app,options);
}catch (e57002){var e = e57002;
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"com.fulcrologic.fulcro.rendering.multiple-roots-renderer","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/rendering/multiple_roots_renderer.cljc",158,10,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Optimized render failed. Falling back to root render."], null);
}),null)),null,(343),null,null,null);

return com.fulcrologic.fulcro.rendering.multiple_roots_renderer.render_roots_BANG_(app,options);
}}
}));

(com.fulcrologic.fulcro.rendering.multiple_roots_renderer.render_BANG_.cljs$lang$maxFixedArity = 2);

/**
 * Generate a plain React class that can render a Fulcro UIRoot. NOTE: The UIRoot must register/deregister itself
 *   in the component lifecycle:
 * 
 *   ```
 *   (defsc UIRoot [this props]
 *  {:componentDidMount     (fn [this] (mroot/register-root! this))
 *   :componentWillUnmount  (fn [this] (mroot/deregister-root! this))
 *   :initial-state {}
 *   :query [root-like-query]}
 *  ...)
 *   ```
 * 
 *   The `fulcro-app` is the app under which this root will be rendered. Create different factories if you have more than
 *   one mounted app.
 *   
 */
com.fulcrologic.fulcro.rendering.multiple_roots_renderer.floating_root_react_class = (function com$fulcrologic$fulcro$rendering$multiple_roots_renderer$floating_root_react_class(UIRoot,fulcro_app){
var cls = (function (){
return null;
});
var ui_root = com.fulcrologic.fulcro.components.computed_factory.cljs$core$IFn$_invoke$arity$1(UIRoot);
com.fulcrologic.fulcro.rendering.multiple_roots_renderer.goog$module$goog$object.extend(cls.prototype,module$node_modules$react$index.Component.prototype,cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"shouldComponentUpdate","shouldComponentUpdate",1795750960),(function (){
return false;
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function (){
var this$ = this;
var js_props = this$.props;
var app__56732__auto__ = (function (){var or__5002__auto__ = com.fulcrologic.fulcro.components._STAR_app_STAR_;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return fulcro_app;
}
})();
var _STAR_app_STAR__orig_val__57031 = com.fulcrologic.fulcro.components._STAR_app_STAR_;
var _STAR_shared_STAR__orig_val__57032 = com.fulcrologic.fulcro.components._STAR_shared_STAR_;
var _STAR_app_STAR__temp_val__57033 = app__56732__auto__;
var _STAR_shared_STAR__temp_val__57034 = com.fulcrologic.fulcro.components.shared.cljs$core$IFn$_invoke$arity$1(app__56732__auto__);
(com.fulcrologic.fulcro.components._STAR_app_STAR_ = _STAR_app_STAR__temp_val__57033);

(com.fulcrologic.fulcro.components._STAR_shared_STAR_ = _STAR_shared_STAR__temp_val__57034);

try{var state_map = (function (){var G__57038 = fulcro_app;
var G__57038__$1 = (((G__57038 == null))?null:new cljs.core.Keyword("com.fulcrologic.fulcro.application","state-atom","com.fulcrologic.fulcro.application/state-atom",648128366).cljs$core$IFn$_invoke$arity$1(G__57038));
if((G__57038__$1 == null)){
return null;
} else {
return cljs.core.deref(G__57038__$1);
}
})();
var query = com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$2(UIRoot,state_map);
var props = com.fulcrologic.fulcro.algorithms.denormalize.db__GT_tree(query,state_map,state_map);
var G__57044 = props;
var G__57045 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"js-props","js-props",1900369280),js_props], null);
return (ui_root.cljs$core$IFn$_invoke$arity$2 ? ui_root.cljs$core$IFn$_invoke$arity$2(G__57044,G__57045) : ui_root.call(null, G__57044,G__57045));
}finally {(com.fulcrologic.fulcro.components._STAR_shared_STAR_ = _STAR_shared_STAR__orig_val__57032);

(com.fulcrologic.fulcro.components._STAR_app_STAR_ = _STAR_app_STAR__orig_val__57031);
}})], null)));

return cls;
});
/**
 * Create a factory that renders a floating root in a normal Fulcro context (body of a Fulcro component). This factory
 * has the same sync constraints as normal `component/factory` functions. See `components/with-parent-context`.
 * 
 *   `UIClass`: A class that will behave as a floating root. NOTE: that class MUST have a mount/unmount hook
 *   to regsiter/deregister itself as a root.
 * 
 *   `options`: An options map. Same as for `component/factory`. Note, however, that this factory will *not* receive
 *   props, so a `:keyfn` would have to be based on something else.
 * 
 *   You normally do not pass any props to this factory because it is controlling the component and feeding props from
 *   the database. Props sent to this factory are only used by the wrapper, however, `:react-key` is useful if you
 *   have a bunch of sibling roots and need to set the react key for each.
 *   
 */
com.fulcrologic.fulcro.rendering.multiple_roots_renderer.floating_root_factory = (function com$fulcrologic$fulcro$rendering$multiple_roots_renderer$floating_root_factory(var_args){
var G__57055 = arguments.length;
switch (G__57055) {
case 1:
return com.fulcrologic.fulcro.rendering.multiple_roots_renderer.floating_root_factory.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.rendering.multiple_roots_renderer.floating_root_factory.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.rendering.multiple_roots_renderer.floating_root_factory.cljs$core$IFn$_invoke$arity$1 = (function (UIClass){
return com.fulcrologic.fulcro.rendering.multiple_roots_renderer.floating_root_factory.cljs$core$IFn$_invoke$arity$2(UIClass,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.rendering.multiple_roots_renderer.floating_root_factory.cljs$core$IFn$_invoke$arity$2 = (function (UIClass,options){
var constructor$ = (function (){
return null;
});
var ui_factory = com.fulcrologic.fulcro.components.computed_factory.cljs$core$IFn$_invoke$arity$1(UIClass);
var render = (function (this$){
var state_map = (function (){var G__57063 = com.fulcrologic.fulcro.components._STAR_app_STAR_;
var G__57063__$1 = (((G__57063 == null))?null:new cljs.core.Keyword("com.fulcrologic.fulcro.application","state-atom","com.fulcrologic.fulcro.application/state-atom",648128366).cljs$core$IFn$_invoke$arity$1(G__57063));
if((G__57063__$1 == null)){
return null;
} else {
return cljs.core.deref(G__57063__$1);
}
})();
var query = com.fulcrologic.fulcro.components.get_query.cljs$core$IFn$_invoke$arity$2(UIClass,state_map);
var props = com.fulcrologic.fulcro.algorithms.denormalize.db__GT_tree(query,state_map,state_map);
var G__57069 = (function (){var or__5002__auto__ = props;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
var G__57070 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
return (ui_factory.cljs$core$IFn$_invoke$arity$2 ? ui_factory.cljs$core$IFn$_invoke$arity$2(G__57069,G__57070) : ui_factory.call(null, G__57069,G__57070));
});
var wrapper_class = com.fulcrologic.fulcro.components.configure_component_BANG_(constructor$,new cljs.core.Keyword("com.fulcrologic.fulcro.rendering.multiple-roots-renderer","wrapper","com.fulcrologic.fulcro.rendering.multiple-roots-renderer/wrapper",-2035797237),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"shouldComponentUpdate","shouldComponentUpdate",1795750960),(function (_,___$1,___$2){
return false;
}),new cljs.core.Keyword(null,"render","render",-1408033454),render], null));
var wrapper_factory = com.fulcrologic.fulcro.components.factory.cljs$core$IFn$_invoke$arity$2(wrapper_class,options);
return wrapper_factory;
}));

(com.fulcrologic.fulcro.rendering.multiple_roots_renderer.floating_root_factory.cljs$lang$maxFixedArity = 2);


//# sourceMappingURL=com.fulcrologic.fulcro.rendering.multiple_roots_renderer.js.map
