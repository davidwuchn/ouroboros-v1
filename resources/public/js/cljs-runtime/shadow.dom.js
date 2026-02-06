goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = true;

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_43179 = (function (this$){
var x__5350__auto__ = (((this$ == null))?null:this$);
var m__5351__auto__ = (shadow.dom._to_dom[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5351__auto__.call(null, this$));
} else {
var m__5349__auto__ = (shadow.dom._to_dom["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5349__auto__.call(null, this$));
} else {
throw cljs.core.missing_protocol("IElement.-to-dom",this$);
}
}
});
shadow.dom._to_dom = (function shadow$dom$_to_dom(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$IElement$_to_dom$arity$1 == null)))))){
return this$.shadow$dom$IElement$_to_dom$arity$1(this$);
} else {
return shadow$dom$IElement$_to_dom$dyn_43179(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_43183 = (function (this$){
var x__5350__auto__ = (((this$ == null))?null:this$);
var m__5351__auto__ = (shadow.dom._to_svg[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5351__auto__.call(null, this$));
} else {
var m__5349__auto__ = (shadow.dom._to_svg["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5349__auto__.call(null, this$));
} else {
throw cljs.core.missing_protocol("SVGElement.-to-svg",this$);
}
}
});
shadow.dom._to_svg = (function shadow$dom$_to_svg(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$SVGElement$_to_svg$arity$1 == null)))))){
return this$.shadow$dom$SVGElement$_to_svg$arity$1(this$);
} else {
return shadow$dom$SVGElement$_to_svg$dyn_43183(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__41866 = coll;
var G__41867 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__41866,G__41867) : shadow.dom.lazy_native_coll_seq.call(null, G__41866,G__41867));
})());
}),null,null));
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.core.IIndexed}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IDeref}
 * @implements {shadow.dom.IElement}
*/
shadow.dom.NativeColl = (function (coll){
this.coll = coll;
this.cljs$lang$protocol_mask$partition0$ = 8421394;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.dom.NativeColl.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (this$,n){
var self__ = this;
var this$__$1 = this;
return (self__.coll[n]);
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (this$,n,not_found){
var self__ = this;
var this$__$1 = this;
var or__5002__auto__ = (self__.coll[n]);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return not_found;
}
}));

(shadow.dom.NativeColl.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll.length;
}));

(shadow.dom.NativeColl.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return shadow.dom.lazy_native_coll_seq(self__.coll,(0));
}));

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"coll","coll",-1006698606,null)], null);
}));

(shadow.dom.NativeColl.cljs$lang$type = true);

(shadow.dom.NativeColl.cljs$lang$ctorStr = "shadow.dom/NativeColl");

(shadow.dom.NativeColl.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"shadow.dom/NativeColl");
}));

/**
 * Positional factory function for shadow.dom/NativeColl.
 */
shadow.dom.__GT_NativeColl = (function shadow$dom$__GT_NativeColl(coll){
return (new shadow.dom.NativeColl(coll));
});

shadow.dom.native_coll = (function shadow$dom$native_coll(coll){
return (new shadow.dom.NativeColl(coll));
});
shadow.dom.dom_node = (function shadow$dom$dom_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$IElement$))))?true:false):false)){
return el.shadow$dom$IElement$_to_dom$arity$1(null, );
} else {
if(typeof el === 'string'){
return document.createTextNode(el);
} else {
if(typeof el === 'number'){
return document.createTextNode(cljs.core.str.cljs$core$IFn$_invoke$arity$1(el));
} else {
return el;

}
}
}
}
});
shadow.dom.query_one = (function shadow$dom$query_one(var_args){
var G__41916 = arguments.length;
switch (G__41916) {
case 1:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return document.querySelector(sel);
}));

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return shadow.dom.dom_node(root).querySelector(sel);
}));

(shadow.dom.query_one.cljs$lang$maxFixedArity = 2);

shadow.dom.query = (function shadow$dom$query(var_args){
var G__41920 = arguments.length;
switch (G__41920) {
case 1:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return (new shadow.dom.NativeColl(document.querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(root).querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$lang$maxFixedArity = 2);

shadow.dom.by_id = (function shadow$dom$by_id(var_args){
var G__41932 = arguments.length;
switch (G__41932) {
case 2:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2 = (function (id,el){
return shadow.dom.dom_node(el).getElementById(id);
}));

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1 = (function (id){
return document.getElementById(id);
}));

(shadow.dom.by_id.cljs$lang$maxFixedArity = 2);

shadow.dom.build = shadow.dom.dom_node;
shadow.dom.ev_stop = (function shadow$dom$ev_stop(var_args){
var G__41941 = arguments.length;
switch (G__41941) {
case 1:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1 = (function (e){
if(cljs.core.truth_(e.stopPropagation)){
e.stopPropagation();

e.preventDefault();
} else {
(e.cancelBubble = true);

(e.returnValue = false);
}

return e;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2 = (function (e,el){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4 = (function (e,el,scope,owner){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$lang$maxFixedArity = 4);

/**
 * check wether a parent node (or the document) contains the child
 */
shadow.dom.contains_QMARK_ = (function shadow$dom$contains_QMARK_(var_args){
var G__41980 = arguments.length;
switch (G__41980) {
case 1:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (el){
return goog.dom.contains(document,shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (parent,el){
return goog.dom.contains(shadow.dom.dom_node(parent),shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$lang$maxFixedArity = 2);

shadow.dom.add_class = (function shadow$dom$add_class(el,cls){
return goog.dom.classlist.add(shadow.dom.dom_node(el),cls);
});
shadow.dom.remove_class = (function shadow$dom$remove_class(el,cls){
return goog.dom.classlist.remove(shadow.dom.dom_node(el),cls);
});
shadow.dom.toggle_class = (function shadow$dom$toggle_class(var_args){
var G__42005 = arguments.length;
switch (G__42005) {
case 2:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2 = (function (el,cls){
return goog.dom.classlist.toggle(shadow.dom.dom_node(el),cls);
}));

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3 = (function (el,cls,v){
if(cljs.core.truth_(v)){
return shadow.dom.add_class(el,cls);
} else {
return shadow.dom.remove_class(el,cls);
}
}));

(shadow.dom.toggle_class.cljs$lang$maxFixedArity = 3);

shadow.dom.dom_listen = (cljs.core.truth_((function (){var or__5002__auto__ = (!((typeof document !== 'undefined')));
if(or__5002__auto__){
return or__5002__auto__;
} else {
return document.addEventListener;
}
})())?(function shadow$dom$dom_listen_good(el,ev,handler){
return el.addEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_ie(el,ev,handler){
try{return el.attachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),(function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null, e,el));
}));
}catch (e42011){if((e42011 instanceof Object)){
var e = e42011;
return console.log("didnt support attachEvent",el,e);
} else {
throw e42011;

}
}}));
shadow.dom.dom_listen_remove = (cljs.core.truth_((function (){var or__5002__auto__ = (!((typeof document !== 'undefined')));
if(or__5002__auto__){
return or__5002__auto__;
} else {
return document.removeEventListener;
}
})())?(function shadow$dom$dom_listen_remove_good(el,ev,handler){
return el.removeEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_remove_ie(el,ev,handler){
return el.detachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),handler);
}));
shadow.dom.on_query = (function shadow$dom$on_query(root_el,ev,selector,handler){
var seq__42022 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__42023 = null;
var count__42024 = (0);
var i__42025 = (0);
while(true){
if((i__42025 < count__42024)){
var el = chunk__42023.cljs$core$IIndexed$_nth$arity$2(null, i__42025);
var handler_43217__$1 = ((function (seq__42022,chunk__42023,count__42024,i__42025,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null, e,el));
});})(seq__42022,chunk__42023,count__42024,i__42025,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_43217__$1);


var G__43218 = seq__42022;
var G__43219 = chunk__42023;
var G__43220 = count__42024;
var G__43221 = (i__42025 + (1));
seq__42022 = G__43218;
chunk__42023 = G__43219;
count__42024 = G__43220;
i__42025 = G__43221;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__42022);
if(temp__5825__auto__){
var seq__42022__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__42022__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__42022__$1);
var G__43223 = cljs.core.chunk_rest(seq__42022__$1);
var G__43224 = c__5525__auto__;
var G__43225 = cljs.core.count(c__5525__auto__);
var G__43226 = (0);
seq__42022 = G__43223;
chunk__42023 = G__43224;
count__42024 = G__43225;
i__42025 = G__43226;
continue;
} else {
var el = cljs.core.first(seq__42022__$1);
var handler_43228__$1 = ((function (seq__42022,chunk__42023,count__42024,i__42025,el,seq__42022__$1,temp__5825__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null, e,el));
});})(seq__42022,chunk__42023,count__42024,i__42025,el,seq__42022__$1,temp__5825__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_43228__$1);


var G__43229 = cljs.core.next(seq__42022__$1);
var G__43230 = null;
var G__43231 = (0);
var G__43232 = (0);
seq__42022 = G__43229;
chunk__42023 = G__43230;
count__42024 = G__43231;
i__42025 = G__43232;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.on = (function shadow$dom$on(var_args){
var G__42071 = arguments.length;
switch (G__42071) {
case 3:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.on.cljs$core$IFn$_invoke$arity$3 = (function (el,ev,handler){
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4(el,ev,handler,false);
}));

(shadow.dom.on.cljs$core$IFn$_invoke$arity$4 = (function (el,ev,handler,capture){
if(cljs.core.vector_QMARK_(ev)){
return shadow.dom.on_query(el,cljs.core.first(ev),cljs.core.second(ev),handler);
} else {
var handler__$1 = (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null, e,el));
});
return shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(ev),handler__$1);
}
}));

(shadow.dom.on.cljs$lang$maxFixedArity = 4);

shadow.dom.remove_event_handler = (function shadow$dom$remove_event_handler(el,ev,handler){
return shadow.dom.dom_listen_remove(shadow.dom.dom_node(el),cljs.core.name(ev),handler);
});
shadow.dom.add_event_listeners = (function shadow$dom$add_event_listeners(el,events){
var seq__42099 = cljs.core.seq(events);
var chunk__42103 = null;
var count__42104 = (0);
var i__42105 = (0);
while(true){
if((i__42105 < count__42104)){
var vec__42135 = chunk__42103.cljs$core$IIndexed$_nth$arity$2(null, i__42105);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42135,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42135,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__43235 = seq__42099;
var G__43236 = chunk__42103;
var G__43237 = count__42104;
var G__43238 = (i__42105 + (1));
seq__42099 = G__43235;
chunk__42103 = G__43236;
count__42104 = G__43237;
i__42105 = G__43238;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__42099);
if(temp__5825__auto__){
var seq__42099__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__42099__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__42099__$1);
var G__43239 = cljs.core.chunk_rest(seq__42099__$1);
var G__43240 = c__5525__auto__;
var G__43241 = cljs.core.count(c__5525__auto__);
var G__43242 = (0);
seq__42099 = G__43239;
chunk__42103 = G__43240;
count__42104 = G__43241;
i__42105 = G__43242;
continue;
} else {
var vec__42140 = cljs.core.first(seq__42099__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42140,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42140,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__43243 = cljs.core.next(seq__42099__$1);
var G__43244 = null;
var G__43245 = (0);
var G__43246 = (0);
seq__42099 = G__43243;
chunk__42103 = G__43244;
count__42104 = G__43245;
i__42105 = G__43246;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_style = (function shadow$dom$set_style(el,styles){
var dom = shadow.dom.dom_node(el);
var seq__42150 = cljs.core.seq(styles);
var chunk__42151 = null;
var count__42152 = (0);
var i__42153 = (0);
while(true){
if((i__42153 < count__42152)){
var vec__42170 = chunk__42151.cljs$core$IIndexed$_nth$arity$2(null, i__42153);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42170,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42170,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__43247 = seq__42150;
var G__43248 = chunk__42151;
var G__43249 = count__42152;
var G__43250 = (i__42153 + (1));
seq__42150 = G__43247;
chunk__42151 = G__43248;
count__42152 = G__43249;
i__42153 = G__43250;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__42150);
if(temp__5825__auto__){
var seq__42150__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__42150__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__42150__$1);
var G__43251 = cljs.core.chunk_rest(seq__42150__$1);
var G__43252 = c__5525__auto__;
var G__43253 = cljs.core.count(c__5525__auto__);
var G__43254 = (0);
seq__42150 = G__43251;
chunk__42151 = G__43252;
count__42152 = G__43253;
i__42153 = G__43254;
continue;
} else {
var vec__42174 = cljs.core.first(seq__42150__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42174,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42174,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__43255 = cljs.core.next(seq__42150__$1);
var G__43256 = null;
var G__43257 = (0);
var G__43258 = (0);
seq__42150 = G__43255;
chunk__42151 = G__43256;
count__42152 = G__43257;
i__42153 = G__43258;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_attr_STAR_ = (function shadow$dom$set_attr_STAR_(el,key,value){
var G__42179_43259 = key;
var G__42179_43260__$1 = (((G__42179_43259 instanceof cljs.core.Keyword))?G__42179_43259.fqn:null);
switch (G__42179_43260__$1) {
case "id":
(el.id = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "class":
(el.className = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "for":
(el.htmlFor = value);

break;
case "cellpadding":
el.setAttribute("cellPadding",value);

break;
case "cellspacing":
el.setAttribute("cellSpacing",value);

break;
case "colspan":
el.setAttribute("colSpan",value);

break;
case "frameborder":
el.setAttribute("frameBorder",value);

break;
case "height":
el.setAttribute("height",value);

break;
case "maxlength":
el.setAttribute("maxLength",value);

break;
case "role":
el.setAttribute("role",value);

break;
case "rowspan":
el.setAttribute("rowSpan",value);

break;
case "type":
el.setAttribute("type",value);

break;
case "usemap":
el.setAttribute("useMap",value);

break;
case "valign":
el.setAttribute("vAlign",value);

break;
case "width":
el.setAttribute("width",value);

break;
case "on":
shadow.dom.add_event_listeners(el,value);

break;
case "style":
if((value == null)){
} else {
if(typeof value === 'string'){
el.setAttribute("style",value);
} else {
if(cljs.core.map_QMARK_(value)){
shadow.dom.set_style(el,value);
} else {
goog.style.setStyle(el,value);

}
}
}

break;
default:
var ks_43262 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__5002__auto__ = goog.string.startsWith(ks_43262,"data-");
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return goog.string.startsWith(ks_43262,"aria-");
}
})())){
el.setAttribute(ks_43262,value);
} else {
(el[ks_43262] = value);
}

}

return el;
});
shadow.dom.set_attrs = (function shadow$dom$set_attrs(el,attrs){
return cljs.core.reduce_kv((function (el__$1,key,value){
shadow.dom.set_attr_STAR_(el__$1,key,value);

return el__$1;
}),shadow.dom.dom_node(el),attrs);
});
shadow.dom.set_attr = (function shadow$dom$set_attr(el,key,value){
return shadow.dom.set_attr_STAR_(shadow.dom.dom_node(el),key,value);
});
shadow.dom.has_class_QMARK_ = (function shadow$dom$has_class_QMARK_(el,cls){
return goog.dom.classlist.contains(shadow.dom.dom_node(el),cls);
});
shadow.dom.merge_class_string = (function shadow$dom$merge_class_string(current,extra_class){
if(cljs.core.seq(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(extra_class)].join('');
} else {
return extra_class;
}
});
shadow.dom.parse_tag = (function shadow$dom$parse_tag(spec){
var spec__$1 = cljs.core.name(spec);
var fdot = spec__$1.indexOf(".");
var fhash = spec__$1.indexOf("#");
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1,null,null], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fdot),null,clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1))),null], null);
} else {
if((fhash > fdot)){
throw ["cant have id after class?",spec__$1].join('');
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1)),fdot),clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);

}
}
}
}
});
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__42232){
var map__42233 = p__42232;
var map__42233__$1 = cljs.core.__destructure_map(map__42233);
var props = map__42233__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42233__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__42236 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42236,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42236,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42236,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__42240 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__42240,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__42240;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__42244 = arguments.length;
switch (G__42244) {
case 1:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.append.cljs$core$IFn$_invoke$arity$1 = (function (node){
if(cljs.core.truth_(node)){
var temp__5825__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5825__auto__)){
var n = temp__5825__auto__;
document.body.appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$core$IFn$_invoke$arity$2 = (function (el,node){
if(cljs.core.truth_(node)){
var temp__5825__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5825__auto__)){
var n = temp__5825__auto__;
shadow.dom.dom_node(el).appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$lang$maxFixedArity = 2);

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__42254){
var vec__42256 = p__42254;
var seq__42257 = cljs.core.seq(vec__42256);
var first__42258 = cljs.core.first(seq__42257);
var seq__42257__$1 = cljs.core.next(seq__42257);
var nn = first__42258;
var first__42258__$1 = cljs.core.first(seq__42257__$1);
var seq__42257__$2 = cljs.core.next(seq__42257__$1);
var np = first__42258__$1;
var nc = seq__42257__$2;
var node = vec__42256;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__42263 = nn;
var G__42264 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__42263,G__42264) : create_fn.call(null, G__42263,G__42264));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null, nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__42268 = nn;
var G__42269 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__42268,G__42269) : create_fn.call(null, G__42268,G__42269));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__42272 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42272,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42272,(1),null);
var seq__42277_43288 = cljs.core.seq(node_children);
var chunk__42278_43289 = null;
var count__42279_43290 = (0);
var i__42280_43291 = (0);
while(true){
if((i__42280_43291 < count__42279_43290)){
var child_struct_43292 = chunk__42278_43289.cljs$core$IIndexed$_nth$arity$2(null, i__42280_43291);
var children_43294 = shadow.dom.dom_node(child_struct_43292);
if(cljs.core.seq_QMARK_(children_43294)){
var seq__42365_43295 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_43294));
var chunk__42367_43296 = null;
var count__42368_43297 = (0);
var i__42369_43298 = (0);
while(true){
if((i__42369_43298 < count__42368_43297)){
var child_43299 = chunk__42367_43296.cljs$core$IIndexed$_nth$arity$2(null, i__42369_43298);
if(cljs.core.truth_(child_43299)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_43299);


var G__43300 = seq__42365_43295;
var G__43301 = chunk__42367_43296;
var G__43302 = count__42368_43297;
var G__43303 = (i__42369_43298 + (1));
seq__42365_43295 = G__43300;
chunk__42367_43296 = G__43301;
count__42368_43297 = G__43302;
i__42369_43298 = G__43303;
continue;
} else {
var G__43304 = seq__42365_43295;
var G__43305 = chunk__42367_43296;
var G__43306 = count__42368_43297;
var G__43307 = (i__42369_43298 + (1));
seq__42365_43295 = G__43304;
chunk__42367_43296 = G__43305;
count__42368_43297 = G__43306;
i__42369_43298 = G__43307;
continue;
}
} else {
var temp__5825__auto___43308 = cljs.core.seq(seq__42365_43295);
if(temp__5825__auto___43308){
var seq__42365_43309__$1 = temp__5825__auto___43308;
if(cljs.core.chunked_seq_QMARK_(seq__42365_43309__$1)){
var c__5525__auto___43310 = cljs.core.chunk_first(seq__42365_43309__$1);
var G__43311 = cljs.core.chunk_rest(seq__42365_43309__$1);
var G__43312 = c__5525__auto___43310;
var G__43313 = cljs.core.count(c__5525__auto___43310);
var G__43314 = (0);
seq__42365_43295 = G__43311;
chunk__42367_43296 = G__43312;
count__42368_43297 = G__43313;
i__42369_43298 = G__43314;
continue;
} else {
var child_43315 = cljs.core.first(seq__42365_43309__$1);
if(cljs.core.truth_(child_43315)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_43315);


var G__43317 = cljs.core.next(seq__42365_43309__$1);
var G__43318 = null;
var G__43319 = (0);
var G__43320 = (0);
seq__42365_43295 = G__43317;
chunk__42367_43296 = G__43318;
count__42368_43297 = G__43319;
i__42369_43298 = G__43320;
continue;
} else {
var G__43321 = cljs.core.next(seq__42365_43309__$1);
var G__43322 = null;
var G__43323 = (0);
var G__43324 = (0);
seq__42365_43295 = G__43321;
chunk__42367_43296 = G__43322;
count__42368_43297 = G__43323;
i__42369_43298 = G__43324;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_43294);
}


var G__43325 = seq__42277_43288;
var G__43326 = chunk__42278_43289;
var G__43327 = count__42279_43290;
var G__43328 = (i__42280_43291 + (1));
seq__42277_43288 = G__43325;
chunk__42278_43289 = G__43326;
count__42279_43290 = G__43327;
i__42280_43291 = G__43328;
continue;
} else {
var temp__5825__auto___43329 = cljs.core.seq(seq__42277_43288);
if(temp__5825__auto___43329){
var seq__42277_43330__$1 = temp__5825__auto___43329;
if(cljs.core.chunked_seq_QMARK_(seq__42277_43330__$1)){
var c__5525__auto___43332 = cljs.core.chunk_first(seq__42277_43330__$1);
var G__43333 = cljs.core.chunk_rest(seq__42277_43330__$1);
var G__43334 = c__5525__auto___43332;
var G__43335 = cljs.core.count(c__5525__auto___43332);
var G__43336 = (0);
seq__42277_43288 = G__43333;
chunk__42278_43289 = G__43334;
count__42279_43290 = G__43335;
i__42280_43291 = G__43336;
continue;
} else {
var child_struct_43337 = cljs.core.first(seq__42277_43330__$1);
var children_43339 = shadow.dom.dom_node(child_struct_43337);
if(cljs.core.seq_QMARK_(children_43339)){
var seq__42417_43340 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_43339));
var chunk__42419_43341 = null;
var count__42420_43342 = (0);
var i__42421_43343 = (0);
while(true){
if((i__42421_43343 < count__42420_43342)){
var child_43344 = chunk__42419_43341.cljs$core$IIndexed$_nth$arity$2(null, i__42421_43343);
if(cljs.core.truth_(child_43344)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_43344);


var G__43346 = seq__42417_43340;
var G__43347 = chunk__42419_43341;
var G__43348 = count__42420_43342;
var G__43349 = (i__42421_43343 + (1));
seq__42417_43340 = G__43346;
chunk__42419_43341 = G__43347;
count__42420_43342 = G__43348;
i__42421_43343 = G__43349;
continue;
} else {
var G__43351 = seq__42417_43340;
var G__43352 = chunk__42419_43341;
var G__43353 = count__42420_43342;
var G__43354 = (i__42421_43343 + (1));
seq__42417_43340 = G__43351;
chunk__42419_43341 = G__43352;
count__42420_43342 = G__43353;
i__42421_43343 = G__43354;
continue;
}
} else {
var temp__5825__auto___43355__$1 = cljs.core.seq(seq__42417_43340);
if(temp__5825__auto___43355__$1){
var seq__42417_43357__$1 = temp__5825__auto___43355__$1;
if(cljs.core.chunked_seq_QMARK_(seq__42417_43357__$1)){
var c__5525__auto___43358 = cljs.core.chunk_first(seq__42417_43357__$1);
var G__43359 = cljs.core.chunk_rest(seq__42417_43357__$1);
var G__43360 = c__5525__auto___43358;
var G__43361 = cljs.core.count(c__5525__auto___43358);
var G__43362 = (0);
seq__42417_43340 = G__43359;
chunk__42419_43341 = G__43360;
count__42420_43342 = G__43361;
i__42421_43343 = G__43362;
continue;
} else {
var child_43363 = cljs.core.first(seq__42417_43357__$1);
if(cljs.core.truth_(child_43363)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_43363);


var G__43365 = cljs.core.next(seq__42417_43357__$1);
var G__43366 = null;
var G__43367 = (0);
var G__43368 = (0);
seq__42417_43340 = G__43365;
chunk__42419_43341 = G__43366;
count__42420_43342 = G__43367;
i__42421_43343 = G__43368;
continue;
} else {
var G__43369 = cljs.core.next(seq__42417_43357__$1);
var G__43370 = null;
var G__43371 = (0);
var G__43372 = (0);
seq__42417_43340 = G__43369;
chunk__42419_43341 = G__43370;
count__42420_43342 = G__43371;
i__42421_43343 = G__43372;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_43339);
}


var G__43373 = cljs.core.next(seq__42277_43330__$1);
var G__43374 = null;
var G__43375 = (0);
var G__43376 = (0);
seq__42277_43288 = G__43373;
chunk__42278_43289 = G__43374;
count__42279_43290 = G__43375;
i__42280_43291 = G__43376;
continue;
}
} else {
}
}
break;
}

return node;
});
(cljs.core.Keyword.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Keyword.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1], null));
}));

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_dom,this$__$1);
}));
if(cljs.core.truth_(((typeof HTMLElement) != 'undefined'))){
(HTMLElement.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(HTMLElement.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
if(cljs.core.truth_(((typeof DocumentFragment) != 'undefined'))){
(DocumentFragment.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(DocumentFragment.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
/**
 * clear node children
 */
shadow.dom.reset = (function shadow$dom$reset(node){
return goog.dom.removeChildren(shadow.dom.dom_node(node));
});
shadow.dom.remove = (function shadow$dom$remove(node){
if((((!((node == null))))?(((((node.cljs$lang$protocol_mask$partition0$ & (8388608))) || ((cljs.core.PROTOCOL_SENTINEL === node.cljs$core$ISeqable$))))?true:false):false)){
var seq__42507 = cljs.core.seq(node);
var chunk__42508 = null;
var count__42509 = (0);
var i__42510 = (0);
while(true){
if((i__42510 < count__42509)){
var n = chunk__42508.cljs$core$IIndexed$_nth$arity$2(null, i__42510);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null, n));


var G__43382 = seq__42507;
var G__43383 = chunk__42508;
var G__43384 = count__42509;
var G__43385 = (i__42510 + (1));
seq__42507 = G__43382;
chunk__42508 = G__43383;
count__42509 = G__43384;
i__42510 = G__43385;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__42507);
if(temp__5825__auto__){
var seq__42507__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__42507__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__42507__$1);
var G__43387 = cljs.core.chunk_rest(seq__42507__$1);
var G__43388 = c__5525__auto__;
var G__43389 = cljs.core.count(c__5525__auto__);
var G__43390 = (0);
seq__42507 = G__43387;
chunk__42508 = G__43388;
count__42509 = G__43389;
i__42510 = G__43390;
continue;
} else {
var n = cljs.core.first(seq__42507__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null, n));


var G__43393 = cljs.core.next(seq__42507__$1);
var G__43394 = null;
var G__43395 = (0);
var G__43396 = (0);
seq__42507 = G__43393;
chunk__42508 = G__43394;
count__42509 = G__43395;
i__42510 = G__43396;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return goog.dom.removeNode(node);
}
});
shadow.dom.replace_node = (function shadow$dom$replace_node(old,new$){
return goog.dom.replaceNode(shadow.dom.dom_node(new$),shadow.dom.dom_node(old));
});
shadow.dom.text = (function shadow$dom$text(var_args){
var G__42527 = arguments.length;
switch (G__42527) {
case 2:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.text.cljs$core$IFn$_invoke$arity$2 = (function (el,new_text){
return (shadow.dom.dom_node(el).innerText = new_text);
}));

(shadow.dom.text.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.dom_node(el).innerText;
}));

(shadow.dom.text.cljs$lang$maxFixedArity = 2);

shadow.dom.check = (function shadow$dom$check(var_args){
var G__42536 = arguments.length;
switch (G__42536) {
case 1:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.check.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2(el,true);
}));

(shadow.dom.check.cljs$core$IFn$_invoke$arity$2 = (function (el,checked){
return (shadow.dom.dom_node(el).checked = checked);
}));

(shadow.dom.check.cljs$lang$maxFixedArity = 2);

shadow.dom.checked_QMARK_ = (function shadow$dom$checked_QMARK_(el){
return shadow.dom.dom_node(el).checked;
});
shadow.dom.form_elements = (function shadow$dom$form_elements(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).elements));
});
shadow.dom.children = (function shadow$dom$children(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).children));
});
shadow.dom.child_nodes = (function shadow$dom$child_nodes(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).childNodes));
});
shadow.dom.attr = (function shadow$dom$attr(var_args){
var G__42566 = arguments.length;
switch (G__42566) {
case 2:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$2 = (function (el,key){
return shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
}));

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$3 = (function (el,key,default$){
var or__5002__auto__ = shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return default$;
}
}));

(shadow.dom.attr.cljs$lang$maxFixedArity = 3);

shadow.dom.del_attr = (function shadow$dom$del_attr(el,key){
return shadow.dom.dom_node(el).removeAttribute(cljs.core.name(key));
});
shadow.dom.data = (function shadow$dom$data(el,key){
return shadow.dom.dom_node(el).getAttribute(["data-",cljs.core.name(key)].join(''));
});
shadow.dom.set_data = (function shadow$dom$set_data(el,key,value){
return shadow.dom.dom_node(el).setAttribute(["data-",cljs.core.name(key)].join(''),cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
});
shadow.dom.set_html = (function shadow$dom$set_html(node,text){
return (shadow.dom.dom_node(node).innerHTML = text);
});
shadow.dom.get_html = (function shadow$dom$get_html(node){
return shadow.dom.dom_node(node).innerHTML;
});
shadow.dom.fragment = (function shadow$dom$fragment(var_args){
var args__5732__auto__ = [];
var len__5726__auto___43421 = arguments.length;
var i__5727__auto___43422 = (0);
while(true){
if((i__5727__auto___43422 < len__5726__auto___43421)){
args__5732__auto__.push((arguments[i__5727__auto___43422]));

var G__43423 = (i__5727__auto___43422 + (1));
i__5727__auto___43422 = G__43423;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic = (function (nodes){
var fragment = document.createDocumentFragment();
var seq__42575_43428 = cljs.core.seq(nodes);
var chunk__42576_43429 = null;
var count__42577_43430 = (0);
var i__42578_43431 = (0);
while(true){
if((i__42578_43431 < count__42577_43430)){
var node_43434 = chunk__42576_43429.cljs$core$IIndexed$_nth$arity$2(null, i__42578_43431);
fragment.appendChild(shadow.dom._to_dom(node_43434));


var G__43436 = seq__42575_43428;
var G__43437 = chunk__42576_43429;
var G__43438 = count__42577_43430;
var G__43439 = (i__42578_43431 + (1));
seq__42575_43428 = G__43436;
chunk__42576_43429 = G__43437;
count__42577_43430 = G__43438;
i__42578_43431 = G__43439;
continue;
} else {
var temp__5825__auto___43440 = cljs.core.seq(seq__42575_43428);
if(temp__5825__auto___43440){
var seq__42575_43442__$1 = temp__5825__auto___43440;
if(cljs.core.chunked_seq_QMARK_(seq__42575_43442__$1)){
var c__5525__auto___43443 = cljs.core.chunk_first(seq__42575_43442__$1);
var G__43444 = cljs.core.chunk_rest(seq__42575_43442__$1);
var G__43445 = c__5525__auto___43443;
var G__43446 = cljs.core.count(c__5525__auto___43443);
var G__43447 = (0);
seq__42575_43428 = G__43444;
chunk__42576_43429 = G__43445;
count__42577_43430 = G__43446;
i__42578_43431 = G__43447;
continue;
} else {
var node_43449 = cljs.core.first(seq__42575_43442__$1);
fragment.appendChild(shadow.dom._to_dom(node_43449));


var G__43452 = cljs.core.next(seq__42575_43442__$1);
var G__43453 = null;
var G__43454 = (0);
var G__43455 = (0);
seq__42575_43428 = G__43452;
chunk__42576_43429 = G__43453;
count__42577_43430 = G__43454;
i__42578_43431 = G__43455;
continue;
}
} else {
}
}
break;
}

return (new shadow.dom.NativeColl(fragment));
}));

(shadow.dom.fragment.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq42573){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq42573));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__42584_43457 = cljs.core.seq(scripts);
var chunk__42585_43458 = null;
var count__42586_43459 = (0);
var i__42587_43460 = (0);
while(true){
if((i__42587_43460 < count__42586_43459)){
var vec__42594_43464 = chunk__42585_43458.cljs$core$IIndexed$_nth$arity$2(null, i__42587_43460);
var script_tag_43465 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42594_43464,(0),null);
var script_body_43466 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42594_43464,(1),null);
eval(script_body_43466);


var G__43468 = seq__42584_43457;
var G__43469 = chunk__42585_43458;
var G__43470 = count__42586_43459;
var G__43471 = (i__42587_43460 + (1));
seq__42584_43457 = G__43468;
chunk__42585_43458 = G__43469;
count__42586_43459 = G__43470;
i__42587_43460 = G__43471;
continue;
} else {
var temp__5825__auto___43472 = cljs.core.seq(seq__42584_43457);
if(temp__5825__auto___43472){
var seq__42584_43473__$1 = temp__5825__auto___43472;
if(cljs.core.chunked_seq_QMARK_(seq__42584_43473__$1)){
var c__5525__auto___43475 = cljs.core.chunk_first(seq__42584_43473__$1);
var G__43478 = cljs.core.chunk_rest(seq__42584_43473__$1);
var G__43479 = c__5525__auto___43475;
var G__43480 = cljs.core.count(c__5525__auto___43475);
var G__43481 = (0);
seq__42584_43457 = G__43478;
chunk__42585_43458 = G__43479;
count__42586_43459 = G__43480;
i__42587_43460 = G__43481;
continue;
} else {
var vec__42597_43482 = cljs.core.first(seq__42584_43473__$1);
var script_tag_43483 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42597_43482,(0),null);
var script_body_43484 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42597_43482,(1),null);
eval(script_body_43484);


var G__43497 = cljs.core.next(seq__42584_43473__$1);
var G__43498 = null;
var G__43499 = (0);
var G__43500 = (0);
seq__42584_43457 = G__43497;
chunk__42585_43458 = G__43498;
count__42586_43459 = G__43499;
i__42587_43460 = G__43500;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__42600){
var vec__42601 = p__42600;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42601,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42601,(1),null);
return clojure.string.replace(s__$1,script_tag,"");
}),s,scripts);
});
shadow.dom.str__GT_fragment = (function shadow$dom$str__GT_fragment(s){
var el = document.createElement("div");
(el.innerHTML = s);

return (new shadow.dom.NativeColl(goog.dom.childrenToNode_(document,el)));
});
shadow.dom.node_name = (function shadow$dom$node_name(el){
return shadow.dom.dom_node(el).nodeName;
});
shadow.dom.ancestor_by_class = (function shadow$dom$ancestor_by_class(el,cls){
return goog.dom.getAncestorByClass(shadow.dom.dom_node(el),cls);
});
shadow.dom.ancestor_by_tag = (function shadow$dom$ancestor_by_tag(var_args){
var G__42611 = arguments.length;
switch (G__42611) {
case 2:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2 = (function (el,tag){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag));
}));

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3 = (function (el,tag,cls){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag),cljs.core.name(cls));
}));

(shadow.dom.ancestor_by_tag.cljs$lang$maxFixedArity = 3);

shadow.dom.get_value = (function shadow$dom$get_value(dom){
return goog.dom.forms.getValue(shadow.dom.dom_node(dom));
});
shadow.dom.set_value = (function shadow$dom$set_value(dom,value){
return goog.dom.forms.setValue(shadow.dom.dom_node(dom),value);
});
shadow.dom.px = (function shadow$dom$px(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((value | (0))),"px"].join('');
});
shadow.dom.pct = (function shadow$dom$pct(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),"%"].join('');
});
shadow.dom.remove_style_STAR_ = (function shadow$dom$remove_style_STAR_(el,style){
return el.style.removeProperty(cljs.core.name(style));
});
shadow.dom.remove_style = (function shadow$dom$remove_style(el,style){
var el__$1 = shadow.dom.dom_node(el);
return shadow.dom.remove_style_STAR_(el__$1,style);
});
shadow.dom.remove_styles = (function shadow$dom$remove_styles(el,style_keys){
var el__$1 = shadow.dom.dom_node(el);
var seq__42619 = cljs.core.seq(style_keys);
var chunk__42620 = null;
var count__42621 = (0);
var i__42622 = (0);
while(true){
if((i__42622 < count__42621)){
var it = chunk__42620.cljs$core$IIndexed$_nth$arity$2(null, i__42622);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__43543 = seq__42619;
var G__43544 = chunk__42620;
var G__43545 = count__42621;
var G__43546 = (i__42622 + (1));
seq__42619 = G__43543;
chunk__42620 = G__43544;
count__42621 = G__43545;
i__42622 = G__43546;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__42619);
if(temp__5825__auto__){
var seq__42619__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__42619__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__42619__$1);
var G__43549 = cljs.core.chunk_rest(seq__42619__$1);
var G__43550 = c__5525__auto__;
var G__43551 = cljs.core.count(c__5525__auto__);
var G__43552 = (0);
seq__42619 = G__43549;
chunk__42620 = G__43550;
count__42621 = G__43551;
i__42622 = G__43552;
continue;
} else {
var it = cljs.core.first(seq__42619__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__43555 = cljs.core.next(seq__42619__$1);
var G__43556 = null;
var G__43557 = (0);
var G__43558 = (0);
seq__42619 = G__43555;
chunk__42620 = G__43556;
count__42621 = G__43557;
i__42622 = G__43558;
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
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Coordinate = (function (x,y,__meta,__extmap,__hash){
this.x = x;
this.y = y;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5300__auto__,k__5301__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return this__5300__auto____$1.cljs$core$ILookup$_lookup$arity$3(null, k__5301__auto__,null);
}));

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5302__auto__,k42624,else__5303__auto__){
var self__ = this;
var this__5302__auto____$1 = this;
var G__42628 = k42624;
var G__42628__$1 = (((G__42628 instanceof cljs.core.Keyword))?G__42628.fqn:null);
switch (G__42628__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k42624,else__5303__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5320__auto__,f__5321__auto__,init__5322__auto__){
var self__ = this;
var this__5320__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5323__auto__,p__42629){
var vec__42630 = p__42629;
var k__5324__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42630,(0),null);
var v__5325__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42630,(1),null);
return (f__5321__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5321__auto__.cljs$core$IFn$_invoke$arity$3(ret__5323__auto__,k__5324__auto__,v__5325__auto__) : f__5321__auto__.call(null, ret__5323__auto__,k__5324__auto__,v__5325__auto__));
}),init__5322__auto__,this__5320__auto____$1);
}));

(shadow.dom.Coordinate.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5315__auto__,writer__5316__auto__,opts__5317__auto__){
var self__ = this;
var this__5315__auto____$1 = this;
var pr_pair__5318__auto__ = (function (keyval__5319__auto__){
return cljs.core.pr_sequential_writer(writer__5316__auto__,cljs.core.pr_writer,""," ","",opts__5317__auto__,keyval__5319__auto__);
});
return cljs.core.pr_sequential_writer(writer__5316__auto__,pr_pair__5318__auto__,"#shadow.dom.Coordinate{",", ","}",opts__5317__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"x","x",2099068185),self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"y","y",-1757859776),self__.y],null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__42623){
var self__ = this;
var G__42623__$1 = this;
return (new cljs.core.RecordIter((0),G__42623__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5298__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5295__auto__){
var self__ = this;
var this__5295__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5304__auto__){
var self__ = this;
var this__5304__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5296__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
var h__5111__auto__ = self__.__hash;
if((!((h__5111__auto__ == null)))){
return h__5111__auto__;
} else {
var h__5111__auto____$1 = (function (coll__5297__auto__){
return (145542109 ^ cljs.core.hash_unordered_coll(coll__5297__auto__));
})(this__5296__auto____$1);
(self__.__hash = h__5111__auto____$1);

return h__5111__auto____$1;
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this42625,other42626){
var self__ = this;
var this42625__$1 = this;
return (((!((other42626 == null)))) && ((((this42625__$1.constructor === other42626.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this42625__$1.x,other42626.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this42625__$1.y,other42626.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this42625__$1.__extmap,other42626.__extmap)))))))));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5310__auto__,k__5311__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"y","y",-1757859776),null,new cljs.core.Keyword(null,"x","x",2099068185),null], null), null),k__5311__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5310__auto____$1),self__.__meta),k__5311__auto__);
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5311__auto__)),null));
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5307__auto__,k42624){
var self__ = this;
var this__5307__auto____$1 = this;
var G__42677 = k42624;
var G__42677__$1 = (((G__42677 instanceof cljs.core.Keyword))?G__42677.fqn:null);
switch (G__42677__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k42624);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5308__auto__,k__5309__auto__,G__42623){
var self__ = this;
var this__5308__auto____$1 = this;
var pred__42682 = cljs.core.keyword_identical_QMARK_;
var expr__42683 = k__5309__auto__;
if(cljs.core.truth_((pred__42682.cljs$core$IFn$_invoke$arity$2 ? pred__42682.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__42683) : pred__42682.call(null, new cljs.core.Keyword(null,"x","x",2099068185),expr__42683)))){
return (new shadow.dom.Coordinate(G__42623,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__42682.cljs$core$IFn$_invoke$arity$2 ? pred__42682.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__42683) : pred__42682.call(null, new cljs.core.Keyword(null,"y","y",-1757859776),expr__42683)))){
return (new shadow.dom.Coordinate(self__.x,G__42623,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5309__auto__,G__42623),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5313__auto__){
var self__ = this;
var this__5313__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5299__auto__,G__42623){
var self__ = this;
var this__5299__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__42623,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5305__auto__,entry__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5306__auto__)){
return this__5305__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null, cljs.core._nth(entry__5306__auto__,(0)),cljs.core._nth(entry__5306__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5305__auto____$1,entry__5306__auto__);
}
}));

(shadow.dom.Coordinate.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null),new cljs.core.Symbol(null,"y","y",-117328249,null)], null);
}));

(shadow.dom.Coordinate.cljs$lang$type = true);

(shadow.dom.Coordinate.cljs$lang$ctorPrSeq = (function (this__5346__auto__){
return (new cljs.core.List(null,"shadow.dom/Coordinate",null,(1),null));
}));

(shadow.dom.Coordinate.cljs$lang$ctorPrWriter = (function (this__5346__auto__,writer__5347__auto__){
return cljs.core._write(writer__5347__auto__,"shadow.dom/Coordinate");
}));

/**
 * Positional factory function for shadow.dom/Coordinate.
 */
shadow.dom.__GT_Coordinate = (function shadow$dom$__GT_Coordinate(x,y){
return (new shadow.dom.Coordinate(x,y,null,null,null));
});

/**
 * Factory function for shadow.dom/Coordinate, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__42627){
var extmap__5342__auto__ = (function (){var G__42717 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__42627,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__42627)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__42717);
} else {
return G__42717;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__42627),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__42627),null,cljs.core.not_empty(extmap__5342__auto__),null));
});

shadow.dom.get_position = (function shadow$dom$get_position(el){
var pos = goog.style.getPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_client_position = (function shadow$dom$get_client_position(el){
var pos = goog.style.getClientPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_page_offset = (function shadow$dom$get_page_offset(el){
var pos = goog.style.getPageOffset(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Size = (function (w,h,__meta,__extmap,__hash){
this.w = w;
this.h = h;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5300__auto__,k__5301__auto__){
var self__ = this;
var this__5300__auto____$1 = this;
return this__5300__auto____$1.cljs$core$ILookup$_lookup$arity$3(null, k__5301__auto__,null);
}));

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5302__auto__,k42739,else__5303__auto__){
var self__ = this;
var this__5302__auto____$1 = this;
var G__42747 = k42739;
var G__42747__$1 = (((G__42747 instanceof cljs.core.Keyword))?G__42747.fqn:null);
switch (G__42747__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k42739,else__5303__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5320__auto__,f__5321__auto__,init__5322__auto__){
var self__ = this;
var this__5320__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5323__auto__,p__42753){
var vec__42757 = p__42753;
var k__5324__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42757,(0),null);
var v__5325__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42757,(1),null);
return (f__5321__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5321__auto__.cljs$core$IFn$_invoke$arity$3(ret__5323__auto__,k__5324__auto__,v__5325__auto__) : f__5321__auto__.call(null, ret__5323__auto__,k__5324__auto__,v__5325__auto__));
}),init__5322__auto__,this__5320__auto____$1);
}));

(shadow.dom.Size.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5315__auto__,writer__5316__auto__,opts__5317__auto__){
var self__ = this;
var this__5315__auto____$1 = this;
var pr_pair__5318__auto__ = (function (keyval__5319__auto__){
return cljs.core.pr_sequential_writer(writer__5316__auto__,cljs.core.pr_writer,""," ","",opts__5317__auto__,keyval__5319__auto__);
});
return cljs.core.pr_sequential_writer(writer__5316__auto__,pr_pair__5318__auto__,"#shadow.dom.Size{",", ","}",opts__5317__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"w","w",354169001),self__.w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"h","h",1109658740),self__.h],null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__42738){
var self__ = this;
var G__42738__$1 = this;
return (new cljs.core.RecordIter((0),G__42738__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Size.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5298__auto__){
var self__ = this;
var this__5298__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Size.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5295__auto__){
var self__ = this;
var this__5295__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5304__auto__){
var self__ = this;
var this__5304__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5296__auto__){
var self__ = this;
var this__5296__auto____$1 = this;
var h__5111__auto__ = self__.__hash;
if((!((h__5111__auto__ == null)))){
return h__5111__auto__;
} else {
var h__5111__auto____$1 = (function (coll__5297__auto__){
return (-1228019642 ^ cljs.core.hash_unordered_coll(coll__5297__auto__));
})(this__5296__auto____$1);
(self__.__hash = h__5111__auto____$1);

return h__5111__auto____$1;
}
}));

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this42740,other42741){
var self__ = this;
var this42740__$1 = this;
return (((!((other42741 == null)))) && ((((this42740__$1.constructor === other42741.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this42740__$1.w,other42741.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this42740__$1.h,other42741.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this42740__$1.__extmap,other42741.__extmap)))))))));
}));

(shadow.dom.Size.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5310__auto__,k__5311__auto__){
var self__ = this;
var this__5310__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"w","w",354169001),null,new cljs.core.Keyword(null,"h","h",1109658740),null], null), null),k__5311__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5310__auto____$1),self__.__meta),k__5311__auto__);
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5311__auto__)),null));
}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5307__auto__,k42739){
var self__ = this;
var this__5307__auto____$1 = this;
var G__42784 = k42739;
var G__42784__$1 = (((G__42784 instanceof cljs.core.Keyword))?G__42784.fqn:null);
switch (G__42784__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k42739);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5308__auto__,k__5309__auto__,G__42738){
var self__ = this;
var this__5308__auto____$1 = this;
var pred__42787 = cljs.core.keyword_identical_QMARK_;
var expr__42788 = k__5309__auto__;
if(cljs.core.truth_((pred__42787.cljs$core$IFn$_invoke$arity$2 ? pred__42787.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__42788) : pred__42787.call(null, new cljs.core.Keyword(null,"w","w",354169001),expr__42788)))){
return (new shadow.dom.Size(G__42738,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__42787.cljs$core$IFn$_invoke$arity$2 ? pred__42787.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__42788) : pred__42787.call(null, new cljs.core.Keyword(null,"h","h",1109658740),expr__42788)))){
return (new shadow.dom.Size(self__.w,G__42738,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5309__auto__,G__42738),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5313__auto__){
var self__ = this;
var this__5313__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5299__auto__,G__42738){
var self__ = this;
var this__5299__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__42738,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5305__auto__,entry__5306__auto__){
var self__ = this;
var this__5305__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5306__auto__)){
return this__5305__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null, cljs.core._nth(entry__5306__auto__,(0)),cljs.core._nth(entry__5306__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5305__auto____$1,entry__5306__auto__);
}
}));

(shadow.dom.Size.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"w","w",1994700528,null),new cljs.core.Symbol(null,"h","h",-1544777029,null)], null);
}));

(shadow.dom.Size.cljs$lang$type = true);

(shadow.dom.Size.cljs$lang$ctorPrSeq = (function (this__5346__auto__){
return (new cljs.core.List(null,"shadow.dom/Size",null,(1),null));
}));

(shadow.dom.Size.cljs$lang$ctorPrWriter = (function (this__5346__auto__,writer__5347__auto__){
return cljs.core._write(writer__5347__auto__,"shadow.dom/Size");
}));

/**
 * Positional factory function for shadow.dom/Size.
 */
shadow.dom.__GT_Size = (function shadow$dom$__GT_Size(w,h){
return (new shadow.dom.Size(w,h,null,null,null));
});

/**
 * Factory function for shadow.dom/Size, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__42745){
var extmap__5342__auto__ = (function (){var G__42805 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__42745,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__42745)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__42805);
} else {
return G__42805;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__42745),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__42745),null,cljs.core.not_empty(extmap__5342__auto__),null));
});

shadow.dom.size__GT_clj = (function shadow$dom$size__GT_clj(size){
return (new shadow.dom.Size(size.width,size.height,null,null,null));
});
shadow.dom.get_size = (function shadow$dom$get_size(el){
return shadow.dom.size__GT_clj(goog.style.getSize(shadow.dom.dom_node(el)));
});
shadow.dom.get_height = (function shadow$dom$get_height(el){
return shadow.dom.get_size(el).h;
});
shadow.dom.get_viewport_size = (function shadow$dom$get_viewport_size(){
return shadow.dom.size__GT_clj(goog.dom.getViewportSize());
});
shadow.dom.first_child = (function shadow$dom$first_child(el){
return (shadow.dom.dom_node(el).children[(0)]);
});
shadow.dom.select_option_values = (function shadow$dom$select_option_values(el){
var native$ = shadow.dom.dom_node(el);
var opts = (native$["options"]);
var a__5590__auto__ = opts;
var l__5591__auto__ = a__5590__auto__.length;
var i = (0);
var ret = cljs.core.PersistentVector.EMPTY;
while(true){
if((i < l__5591__auto__)){
var G__43670 = (i + (1));
var G__43671 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__43670;
ret = G__43671;
continue;
} else {
return ret;
}
break;
}
});
shadow.dom.build_url = (function shadow$dom$build_url(path,query_params){
if(cljs.core.empty_QMARK_(query_params)){
return path;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__42887){
var vec__42888 = p__42887;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42888,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42888,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__42900 = arguments.length;
switch (G__42900) {
case 1:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1 = (function (path){
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2(path,cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2 = (function (path,query_params){
return (document["location"]["href"] = shadow.dom.build_url(path,query_params));
}));

(shadow.dom.redirect.cljs$lang$maxFixedArity = 2);

shadow.dom.reload_BANG_ = (function shadow$dom$reload_BANG_(){
return (document.location.href = document.location.href);
});
shadow.dom.tag_name = (function shadow$dom$tag_name(el){
var dom = shadow.dom.dom_node(el);
return dom.tagName;
});
shadow.dom.insert_after = (function shadow$dom$insert_after(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingAfter(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_before = (function shadow$dom$insert_before(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingBefore(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_first = (function shadow$dom$insert_first(ref,new$){
var temp__5823__auto__ = shadow.dom.dom_node(ref).firstChild;
if(cljs.core.truth_(temp__5823__auto__)){
var child = temp__5823__auto__;
return shadow.dom.insert_before(child,new$);
} else {
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2(ref,new$);
}
});
shadow.dom.index_of = (function shadow$dom$index_of(el){
var el__$1 = shadow.dom.dom_node(el);
var i = (0);
while(true){
var ps = el__$1.previousSibling;
if((ps == null)){
return i;
} else {
var G__43681 = ps;
var G__43682 = (i + (1));
el__$1 = G__43681;
i = G__43682;
continue;
}
break;
}
});
shadow.dom.get_parent = (function shadow$dom$get_parent(el){
return goog.dom.getParentElement(shadow.dom.dom_node(el));
});
shadow.dom.parents = (function shadow$dom$parents(el){
var parent = shadow.dom.get_parent(el);
if(cljs.core.truth_(parent)){
return cljs.core.cons(parent,(new cljs.core.LazySeq(null,(function (){
return (shadow.dom.parents.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.parents.cljs$core$IFn$_invoke$arity$1(parent) : shadow.dom.parents.call(null, parent));
}),null,null)));
} else {
return null;
}
});
shadow.dom.matches = (function shadow$dom$matches(el,sel){
return shadow.dom.dom_node(el).matches(sel);
});
shadow.dom.get_next_sibling = (function shadow$dom$get_next_sibling(el){
return goog.dom.getNextElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.get_previous_sibling = (function shadow$dom$get_previous_sibling(el){
return goog.dom.getPreviousElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.xmlns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, ["svg","http://www.w3.org/2000/svg","xlink","http://www.w3.org/1999/xlink"], null));
shadow.dom.create_svg_node = (function shadow$dom$create_svg_node(tag_def,props){
var vec__42960 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42960,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42960,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__42960,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__42971_43698 = cljs.core.seq(props);
var chunk__42972_43699 = null;
var count__42974_43700 = (0);
var i__42975_43701 = (0);
while(true){
if((i__42975_43701 < count__42974_43700)){
var vec__43008_43706 = chunk__42972_43699.cljs$core$IIndexed$_nth$arity$2(null, i__42975_43701);
var k_43707 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43008_43706,(0),null);
var v_43708 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43008_43706,(1),null);
el.setAttributeNS((function (){var temp__5825__auto__ = cljs.core.namespace(k_43707);
if(cljs.core.truth_(temp__5825__auto__)){
var ns = temp__5825__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_43707),v_43708);


var G__43711 = seq__42971_43698;
var G__43712 = chunk__42972_43699;
var G__43713 = count__42974_43700;
var G__43714 = (i__42975_43701 + (1));
seq__42971_43698 = G__43711;
chunk__42972_43699 = G__43712;
count__42974_43700 = G__43713;
i__42975_43701 = G__43714;
continue;
} else {
var temp__5825__auto___43715 = cljs.core.seq(seq__42971_43698);
if(temp__5825__auto___43715){
var seq__42971_43716__$1 = temp__5825__auto___43715;
if(cljs.core.chunked_seq_QMARK_(seq__42971_43716__$1)){
var c__5525__auto___43718 = cljs.core.chunk_first(seq__42971_43716__$1);
var G__43722 = cljs.core.chunk_rest(seq__42971_43716__$1);
var G__43723 = c__5525__auto___43718;
var G__43724 = cljs.core.count(c__5525__auto___43718);
var G__43725 = (0);
seq__42971_43698 = G__43722;
chunk__42972_43699 = G__43723;
count__42974_43700 = G__43724;
i__42975_43701 = G__43725;
continue;
} else {
var vec__43013_43726 = cljs.core.first(seq__42971_43716__$1);
var k_43727 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43013_43726,(0),null);
var v_43728 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43013_43726,(1),null);
el.setAttributeNS((function (){var temp__5825__auto____$1 = cljs.core.namespace(k_43727);
if(cljs.core.truth_(temp__5825__auto____$1)){
var ns = temp__5825__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_43727),v_43728);


var G__43729 = cljs.core.next(seq__42971_43716__$1);
var G__43730 = null;
var G__43731 = (0);
var G__43732 = (0);
seq__42971_43698 = G__43729;
chunk__42972_43699 = G__43730;
count__42974_43700 = G__43731;
i__42975_43701 = G__43732;
continue;
}
} else {
}
}
break;
}

return el;
});
shadow.dom.svg_node = (function shadow$dom$svg_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$SVGElement$))))?true:false):false)){
return el.shadow$dom$SVGElement$_to_svg$arity$1(null, );
} else {
return el;

}
}
});
shadow.dom.make_svg_node = (function shadow$dom$make_svg_node(structure){
var vec__43030 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43030,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__43030,(1),null);
var seq__43033_43738 = cljs.core.seq(node_children);
var chunk__43035_43739 = null;
var count__43036_43740 = (0);
var i__43037_43741 = (0);
while(true){
if((i__43037_43741 < count__43036_43740)){
var child_struct_43743 = chunk__43035_43739.cljs$core$IIndexed$_nth$arity$2(null, i__43037_43741);
if((!((child_struct_43743 == null)))){
if(typeof child_struct_43743 === 'string'){
var text_43744 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_43744),child_struct_43743].join(''));
} else {
var children_43745 = shadow.dom.svg_node(child_struct_43743);
if(cljs.core.seq_QMARK_(children_43745)){
var seq__43091_43746 = cljs.core.seq(children_43745);
var chunk__43093_43747 = null;
var count__43094_43748 = (0);
var i__43095_43749 = (0);
while(true){
if((i__43095_43749 < count__43094_43748)){
var child_43754 = chunk__43093_43747.cljs$core$IIndexed$_nth$arity$2(null, i__43095_43749);
if(cljs.core.truth_(child_43754)){
node.appendChild(child_43754);


var G__43755 = seq__43091_43746;
var G__43756 = chunk__43093_43747;
var G__43757 = count__43094_43748;
var G__43758 = (i__43095_43749 + (1));
seq__43091_43746 = G__43755;
chunk__43093_43747 = G__43756;
count__43094_43748 = G__43757;
i__43095_43749 = G__43758;
continue;
} else {
var G__43761 = seq__43091_43746;
var G__43762 = chunk__43093_43747;
var G__43763 = count__43094_43748;
var G__43764 = (i__43095_43749 + (1));
seq__43091_43746 = G__43761;
chunk__43093_43747 = G__43762;
count__43094_43748 = G__43763;
i__43095_43749 = G__43764;
continue;
}
} else {
var temp__5825__auto___43773 = cljs.core.seq(seq__43091_43746);
if(temp__5825__auto___43773){
var seq__43091_43774__$1 = temp__5825__auto___43773;
if(cljs.core.chunked_seq_QMARK_(seq__43091_43774__$1)){
var c__5525__auto___43778 = cljs.core.chunk_first(seq__43091_43774__$1);
var G__43780 = cljs.core.chunk_rest(seq__43091_43774__$1);
var G__43781 = c__5525__auto___43778;
var G__43782 = cljs.core.count(c__5525__auto___43778);
var G__43783 = (0);
seq__43091_43746 = G__43780;
chunk__43093_43747 = G__43781;
count__43094_43748 = G__43782;
i__43095_43749 = G__43783;
continue;
} else {
var child_43788 = cljs.core.first(seq__43091_43774__$1);
if(cljs.core.truth_(child_43788)){
node.appendChild(child_43788);


var G__43790 = cljs.core.next(seq__43091_43774__$1);
var G__43791 = null;
var G__43792 = (0);
var G__43793 = (0);
seq__43091_43746 = G__43790;
chunk__43093_43747 = G__43791;
count__43094_43748 = G__43792;
i__43095_43749 = G__43793;
continue;
} else {
var G__43798 = cljs.core.next(seq__43091_43774__$1);
var G__43799 = null;
var G__43800 = (0);
var G__43801 = (0);
seq__43091_43746 = G__43798;
chunk__43093_43747 = G__43799;
count__43094_43748 = G__43800;
i__43095_43749 = G__43801;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_43745);
}
}


var G__43802 = seq__43033_43738;
var G__43803 = chunk__43035_43739;
var G__43804 = count__43036_43740;
var G__43805 = (i__43037_43741 + (1));
seq__43033_43738 = G__43802;
chunk__43035_43739 = G__43803;
count__43036_43740 = G__43804;
i__43037_43741 = G__43805;
continue;
} else {
var G__43806 = seq__43033_43738;
var G__43807 = chunk__43035_43739;
var G__43808 = count__43036_43740;
var G__43809 = (i__43037_43741 + (1));
seq__43033_43738 = G__43806;
chunk__43035_43739 = G__43807;
count__43036_43740 = G__43808;
i__43037_43741 = G__43809;
continue;
}
} else {
var temp__5825__auto___43810 = cljs.core.seq(seq__43033_43738);
if(temp__5825__auto___43810){
var seq__43033_43812__$1 = temp__5825__auto___43810;
if(cljs.core.chunked_seq_QMARK_(seq__43033_43812__$1)){
var c__5525__auto___43817 = cljs.core.chunk_first(seq__43033_43812__$1);
var G__43818 = cljs.core.chunk_rest(seq__43033_43812__$1);
var G__43819 = c__5525__auto___43817;
var G__43820 = cljs.core.count(c__5525__auto___43817);
var G__43821 = (0);
seq__43033_43738 = G__43818;
chunk__43035_43739 = G__43819;
count__43036_43740 = G__43820;
i__43037_43741 = G__43821;
continue;
} else {
var child_struct_43822 = cljs.core.first(seq__43033_43812__$1);
if((!((child_struct_43822 == null)))){
if(typeof child_struct_43822 === 'string'){
var text_43824 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_43824),child_struct_43822].join(''));
} else {
var children_43825 = shadow.dom.svg_node(child_struct_43822);
if(cljs.core.seq_QMARK_(children_43825)){
var seq__43120_43826 = cljs.core.seq(children_43825);
var chunk__43122_43827 = null;
var count__43123_43828 = (0);
var i__43124_43829 = (0);
while(true){
if((i__43124_43829 < count__43123_43828)){
var child_43830 = chunk__43122_43827.cljs$core$IIndexed$_nth$arity$2(null, i__43124_43829);
if(cljs.core.truth_(child_43830)){
node.appendChild(child_43830);


var G__43831 = seq__43120_43826;
var G__43832 = chunk__43122_43827;
var G__43833 = count__43123_43828;
var G__43834 = (i__43124_43829 + (1));
seq__43120_43826 = G__43831;
chunk__43122_43827 = G__43832;
count__43123_43828 = G__43833;
i__43124_43829 = G__43834;
continue;
} else {
var G__43835 = seq__43120_43826;
var G__43836 = chunk__43122_43827;
var G__43837 = count__43123_43828;
var G__43838 = (i__43124_43829 + (1));
seq__43120_43826 = G__43835;
chunk__43122_43827 = G__43836;
count__43123_43828 = G__43837;
i__43124_43829 = G__43838;
continue;
}
} else {
var temp__5825__auto___43839__$1 = cljs.core.seq(seq__43120_43826);
if(temp__5825__auto___43839__$1){
var seq__43120_43840__$1 = temp__5825__auto___43839__$1;
if(cljs.core.chunked_seq_QMARK_(seq__43120_43840__$1)){
var c__5525__auto___43842 = cljs.core.chunk_first(seq__43120_43840__$1);
var G__43851 = cljs.core.chunk_rest(seq__43120_43840__$1);
var G__43852 = c__5525__auto___43842;
var G__43853 = cljs.core.count(c__5525__auto___43842);
var G__43854 = (0);
seq__43120_43826 = G__43851;
chunk__43122_43827 = G__43852;
count__43123_43828 = G__43853;
i__43124_43829 = G__43854;
continue;
} else {
var child_43855 = cljs.core.first(seq__43120_43840__$1);
if(cljs.core.truth_(child_43855)){
node.appendChild(child_43855);


var G__43858 = cljs.core.next(seq__43120_43840__$1);
var G__43859 = null;
var G__43860 = (0);
var G__43861 = (0);
seq__43120_43826 = G__43858;
chunk__43122_43827 = G__43859;
count__43123_43828 = G__43860;
i__43124_43829 = G__43861;
continue;
} else {
var G__43862 = cljs.core.next(seq__43120_43840__$1);
var G__43863 = null;
var G__43864 = (0);
var G__43865 = (0);
seq__43120_43826 = G__43862;
chunk__43122_43827 = G__43863;
count__43123_43828 = G__43864;
i__43124_43829 = G__43865;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_43825);
}
}


var G__43866 = cljs.core.next(seq__43033_43812__$1);
var G__43867 = null;
var G__43868 = (0);
var G__43869 = (0);
seq__43033_43738 = G__43866;
chunk__43035_43739 = G__43867;
count__43036_43740 = G__43868;
i__43037_43741 = G__43869;
continue;
} else {
var G__43870 = cljs.core.next(seq__43033_43812__$1);
var G__43871 = null;
var G__43872 = (0);
var G__43873 = (0);
seq__43033_43738 = G__43870;
chunk__43035_43739 = G__43871;
count__43036_43740 = G__43872;
i__43037_43741 = G__43873;
continue;
}
}
} else {
}
}
break;
}

return node;
});
(shadow.dom.SVGElement["string"] = true);

(shadow.dom._to_svg["string"] = (function (this$){
if((this$ instanceof cljs.core.Keyword)){
return shadow.dom.make_svg_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$], null));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("strings cannot be in svgs",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"this","this",-611633625),this$], null));
}
}));

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_svg_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_svg,this$__$1);
}));

(shadow.dom.SVGElement["null"] = true);

(shadow.dom._to_svg["null"] = (function (_){
return null;
}));
shadow.dom.svg = (function shadow$dom$svg(var_args){
var args__5732__auto__ = [];
var len__5726__auto___43881 = arguments.length;
var i__5727__auto___43882 = (0);
while(true){
if((i__5727__auto___43882 < len__5726__auto___43881)){
args__5732__auto__.push((arguments[i__5727__auto___43882]));

var G__43883 = (i__5727__auto___43882 + (1));
i__5727__auto___43882 = G__43883;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic = (function (attrs,children){
return shadow.dom._to_svg(cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",856789142),attrs], null),children)));
}));

(shadow.dom.svg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.dom.svg.cljs$lang$applyTo = (function (seq43146){
var G__43147 = cljs.core.first(seq43146);
var seq43146__$1 = cljs.core.next(seq43146);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__43147,seq43146__$1);
}));


//# sourceMappingURL=shadow.dom.js.map
