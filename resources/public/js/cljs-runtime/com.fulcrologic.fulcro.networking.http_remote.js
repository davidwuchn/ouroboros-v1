goog.provide('com.fulcrologic.fulcro.networking.http_remote');
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","method","com.fulcrologic.fulcro.networking.http-remote/method",934706316),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 9, [new cljs.core.Keyword(null,"get","get",1683182755),"null",new cljs.core.Keyword(null,"patch","patch",380775109),"null",new cljs.core.Keyword(null,"trace","trace",-1082747415),"null",new cljs.core.Keyword(null,"connect","connect",1232828233),"null",new cljs.core.Keyword(null,"delete","delete",-1768633620),"null",new cljs.core.Keyword(null,"head","head",-771383919),"null",new cljs.core.Keyword(null,"post","post",269697687),"null",new cljs.core.Keyword(null,"options","options",99638489),"null",new cljs.core.Keyword(null,"put","put",1299772570),"null"], null), null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 9, [new cljs.core.Keyword(null,"get","get",1683182755),null,new cljs.core.Keyword(null,"patch","patch",380775109),null,new cljs.core.Keyword(null,"trace","trace",-1082747415),null,new cljs.core.Keyword(null,"connect","connect",1232828233),null,new cljs.core.Keyword(null,"delete","delete",-1768633620),null,new cljs.core.Keyword(null,"head","head",-771383919),null,new cljs.core.Keyword(null,"post","post",269697687),null,new cljs.core.Keyword(null,"options","options",99638489),null,new cljs.core.Keyword(null,"put","put",1299772570),null], null), null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","url","com.fulcrologic.fulcro.networking.http-remote/url",-1403244238),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),cljs.core.string_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","headers","com.fulcrologic.fulcro.networking.http-remote/headers",-898565085),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Symbol(null,"string?","string?",-1129175764,null),new cljs.core.Symbol(null,"string?","string?",-1129175764,null)),cljs.spec.alpha.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.string_QMARK_,cljs.core.string_QMARK_], null)),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("cljs.spec.alpha","kfn","cljs.spec.alpha/kfn",672643897),(function (i__13398__auto__,v__13399__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__13399__auto__,(0));
}),new cljs.core.Keyword(null,"into","into",-150836029),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.map_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__50880){
return cljs.core.map_QMARK_(G__50880);
})], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","body","com.fulcrologic.fulcro.networking.http-remote/body",1774671039),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null),cljs.core.any_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","request","com.fulcrologic.fulcro.networking.http-remote/request",2101891015),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","method","com.fulcrologic.fulcro.networking.http-remote/method",934706316),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","body","com.fulcrologic.fulcro.networking.http-remote/body",1774671039),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","url","com.fulcrologic.fulcro.networking.http-remote/url",-1403244238),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","headers","com.fulcrologic.fulcro.networking.http-remote/headers",-898565085)], null)),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","method","com.fulcrologic.fulcro.networking.http-remote/method",934706316),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","body","com.fulcrologic.fulcro.networking.http-remote/body",1774671039),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","url","com.fulcrologic.fulcro.networking.http-remote/url",-1403244238),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","headers","com.fulcrologic.fulcro.networking.http-remote/headers",-898565085)], null),null,null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__50891){
return cljs.core.map_QMARK_(G__50891);
}),(function (G__50891){
return cljs.core.contains_QMARK_(G__50891,new cljs.core.Keyword(null,"method","method",55703592));
}),(function (G__50891){
return cljs.core.contains_QMARK_(G__50891,new cljs.core.Keyword(null,"body","body",-2049205669));
}),(function (G__50891){
return cljs.core.contains_QMARK_(G__50891,new cljs.core.Keyword(null,"url","url",276297046));
}),(function (G__50891){
return cljs.core.contains_QMARK_(G__50891,new cljs.core.Keyword(null,"headers","headers",-835030129));
})], null),(function (G__50891){
return ((cljs.core.map_QMARK_(G__50891)) && (((cljs.core.contains_QMARK_(G__50891,new cljs.core.Keyword(null,"method","method",55703592))) && (((cljs.core.contains_QMARK_(G__50891,new cljs.core.Keyword(null,"body","body",-2049205669))) && (((cljs.core.contains_QMARK_(G__50891,new cljs.core.Keyword(null,"url","url",276297046))) && (cljs.core.contains_QMARK_(G__50891,new cljs.core.Keyword(null,"headers","headers",-835030129))))))))));
}),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","method","com.fulcrologic.fulcro.networking.http-remote/method",934706316),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","body","com.fulcrologic.fulcro.networking.http-remote/body",1774671039),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","url","com.fulcrologic.fulcro.networking.http-remote/url",-1403244238),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","headers","com.fulcrologic.fulcro.networking.http-remote/headers",-898565085)], null),null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.Keyword(null,"url","url",276297046),new cljs.core.Keyword(null,"headers","headers",-835030129)], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"method","method",55703592))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"body","body",-2049205669))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"url","url",276297046))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"headers","headers",-835030129)))], null),null])));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","error","com.fulcrologic.fulcro.networking.http-remote/error",-1451658604),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 12, [new cljs.core.Keyword(null,"offline","offline",-107631935),"null",new cljs.core.Keyword(null,"silent","silent",-1142977785),"null",new cljs.core.Keyword(null,"custom","custom",340151948),"null",new cljs.core.Keyword(null,"abort","abort",521193198),"null",new cljs.core.Keyword(null,"http-error","http-error",-1040049553),"null",new cljs.core.Keyword(null,"network-error","network-error",-1095989517),"null",new cljs.core.Keyword(null,"not-found","not-found",-629079980),"null",new cljs.core.Keyword(null,"exception","exception",-335277064),"null",new cljs.core.Keyword(null,"timeout","timeout",-318625318),"null",new cljs.core.Keyword(null,"middleware-failure","middleware-failure",-1809927973),"null",new cljs.core.Keyword(null,"access-denied","access-denied",959449406),"null",new cljs.core.Keyword(null,"none","none",1333468478),"null"], null), null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 12, [new cljs.core.Keyword(null,"offline","offline",-107631935),null,new cljs.core.Keyword(null,"silent","silent",-1142977785),null,new cljs.core.Keyword(null,"custom","custom",340151948),null,new cljs.core.Keyword(null,"abort","abort",521193198),null,new cljs.core.Keyword(null,"http-error","http-error",-1040049553),null,new cljs.core.Keyword(null,"network-error","network-error",-1095989517),null,new cljs.core.Keyword(null,"not-found","not-found",-629079980),null,new cljs.core.Keyword(null,"exception","exception",-335277064),null,new cljs.core.Keyword(null,"timeout","timeout",-318625318),null,new cljs.core.Keyword(null,"middleware-failure","middleware-failure",-1809927973),null,new cljs.core.Keyword(null,"access-denied","access-denied",959449406),null,new cljs.core.Keyword(null,"none","none",1333468478),null], null), null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","error-text","com.fulcrologic.fulcro.networking.http-remote/error-text",1688434090),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),cljs.core.string_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","status-code","com.fulcrologic.fulcro.networking.http-remote/status-code",-319905462),new cljs.core.Symbol("cljs.core","pos-int?","cljs.core/pos-int?",-2115888030,null),cljs.core.pos_int_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","status-text","com.fulcrologic.fulcro.networking.http-remote/status-text",1990262342),new cljs.core.Symbol("cljs.core","string?","cljs.core/string?",-2072921719,null),cljs.core.string_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","outgoing-request","com.fulcrologic.fulcro.networking.http-remote/outgoing-request",-1149828572),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","request","com.fulcrologic.fulcro.networking.http-remote/request",2101891015),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","request","com.fulcrologic.fulcro.networking.http-remote/request",2101891015));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","transaction","com.fulcrologic.fulcro.networking.http-remote/transaction",-2045447007),new cljs.core.Symbol("cljs.core","vector?","cljs.core/vector?",-1550392028,null),cljs.core.vector_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","progress-phase","com.fulcrologic.fulcro.networking.http-remote/progress-phase",490506134),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"sending","sending",-1806704862),"null",new cljs.core.Keyword(null,"receiving","receiving",829203724),"null",new cljs.core.Keyword(null,"complete","complete",-500388775),"null",new cljs.core.Keyword(null,"failed","failed",-1397425762),"null"], null), null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"sending","sending",-1806704862),null,new cljs.core.Keyword(null,"receiving","receiving",829203724),null,new cljs.core.Keyword(null,"complete","complete",-500388775),null,new cljs.core.Keyword(null,"failed","failed",-1397425762),null], null), null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","progress-event","com.fulcrologic.fulcro.networking.http-remote/progress-event",-929487957),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null),cljs.core.any_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","response","com.fulcrologic.fulcro.networking.http-remote/response",1950226596),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","outgoing-request","com.fulcrologic.fulcro.networking.http-remote/outgoing-request",-1149828572),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","body","com.fulcrologic.fulcro.networking.http-remote/body",1774671039),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","status-code","com.fulcrologic.fulcro.networking.http-remote/status-code",-319905462),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","status-text","com.fulcrologic.fulcro.networking.http-remote/status-text",1990262342),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","error","com.fulcrologic.fulcro.networking.http-remote/error",-1451658604),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","error-text","com.fulcrologic.fulcro.networking.http-remote/error-text",1688434090)], null),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","transaction","com.fulcrologic.fulcro.networking.http-remote/transaction",-2045447007),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","progress-phase","com.fulcrologic.fulcro.networking.http-remote/progress-phase",490506134),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","progress-event","com.fulcrologic.fulcro.networking.http-remote/progress-event",-929487957)], null)),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","outgoing-request","com.fulcrologic.fulcro.networking.http-remote/outgoing-request",-1149828572),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","body","com.fulcrologic.fulcro.networking.http-remote/body",1774671039),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","status-code","com.fulcrologic.fulcro.networking.http-remote/status-code",-319905462),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","status-text","com.fulcrologic.fulcro.networking.http-remote/status-text",1990262342),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","error","com.fulcrologic.fulcro.networking.http-remote/error",-1451658604),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","error-text","com.fulcrologic.fulcro.networking.http-remote/error-text",1688434090)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","transaction","com.fulcrologic.fulcro.networking.http-remote/transaction",-2045447007),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","progress-phase","com.fulcrologic.fulcro.networking.http-remote/progress-phase",490506134),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","progress-event","com.fulcrologic.fulcro.networking.http-remote/progress-event",-929487957)], null),null,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__50937){
return cljs.core.map_QMARK_(G__50937);
}),(function (G__50937){
return cljs.core.contains_QMARK_(G__50937,new cljs.core.Keyword(null,"outgoing-request","outgoing-request",256391368));
}),(function (G__50937){
return cljs.core.contains_QMARK_(G__50937,new cljs.core.Keyword(null,"body","body",-2049205669));
}),(function (G__50937){
return cljs.core.contains_QMARK_(G__50937,new cljs.core.Keyword(null,"status-code","status-code",-1060410130));
}),(function (G__50937){
return cljs.core.contains_QMARK_(G__50937,new cljs.core.Keyword(null,"status-text","status-text",-1834235478));
}),(function (G__50937){
return cljs.core.contains_QMARK_(G__50937,new cljs.core.Keyword(null,"error","error",-978969032));
}),(function (G__50937){
return cljs.core.contains_QMARK_(G__50937,new cljs.core.Keyword(null,"error-text","error-text",2021893718));
})], null),(function (G__50937){
return ((cljs.core.map_QMARK_(G__50937)) && (((cljs.core.contains_QMARK_(G__50937,new cljs.core.Keyword(null,"outgoing-request","outgoing-request",256391368))) && (((cljs.core.contains_QMARK_(G__50937,new cljs.core.Keyword(null,"body","body",-2049205669))) && (((cljs.core.contains_QMARK_(G__50937,new cljs.core.Keyword(null,"status-code","status-code",-1060410130))) && (((cljs.core.contains_QMARK_(G__50937,new cljs.core.Keyword(null,"status-text","status-text",-1834235478))) && (((cljs.core.contains_QMARK_(G__50937,new cljs.core.Keyword(null,"error","error",-978969032))) && (cljs.core.contains_QMARK_(G__50937,new cljs.core.Keyword(null,"error-text","error-text",2021893718))))))))))))));
}),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"transaction","transaction",1777321997),new cljs.core.Keyword(null,"progress-phase","progress-phase",186626618),new cljs.core.Keyword(null,"progress-event","progress-event",1690048087)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","outgoing-request","com.fulcrologic.fulcro.networking.http-remote/outgoing-request",-1149828572),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","body","com.fulcrologic.fulcro.networking.http-remote/body",1774671039),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","status-code","com.fulcrologic.fulcro.networking.http-remote/status-code",-319905462),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","status-text","com.fulcrologic.fulcro.networking.http-remote/status-text",1990262342),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","error","com.fulcrologic.fulcro.networking.http-remote/error",-1451658604),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","error-text","com.fulcrologic.fulcro.networking.http-remote/error-text",1688434090)], null),null,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outgoing-request","outgoing-request",256391368),new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.Keyword(null,"status-code","status-code",-1060410130),new cljs.core.Keyword(null,"status-text","status-text",-1834235478),new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"error-text","error-text",2021893718)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","transaction","com.fulcrologic.fulcro.networking.http-remote/transaction",-2045447007),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","progress-phase","com.fulcrologic.fulcro.networking.http-remote/progress-phase",490506134),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","progress-event","com.fulcrologic.fulcro.networking.http-remote/progress-event",-929487957)], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"outgoing-request","outgoing-request",256391368))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"body","body",-2049205669))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"status-code","status-code",-1060410130))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"status-text","status-text",-1834235478))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"error","error",-978969032))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"error-text","error-text",2021893718)))], null),null])));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","xhrio-event","com.fulcrologic.fulcro.networking.http-remote/xhrio-event",2068632880),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null),cljs.core.any_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","xhrio","com.fulcrologic.fulcro.networking.http-remote/xhrio",1735058914),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null),cljs.core.any_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","make-xhrio","com.fulcrologic.fulcro.networking.http-remote/make-xhrio",1348622897),new cljs.core.Symbol("cljs.core","fn?","cljs.core/fn?",71876239,null),cljs.core.fn_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","response-middleware","com.fulcrologic.fulcro.networking.http-remote/response-middleware",-2107912072),new cljs.core.Symbol("cljs.core","fn?","cljs.core/fn?",71876239,null),cljs.core.fn_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","request-middleware","com.fulcrologic.fulcro.networking.http-remote/request-middleware",-2030599211),new cljs.core.Symbol("cljs.core","fn?","cljs.core/fn?",71876239,null),cljs.core.fn_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","active-requests","com.fulcrologic.fulcro.networking.http-remote/active-requests",741863701),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","and","cljs.spec.alpha/and",-2060279705,null),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__50960#","p1__50960#",-146506198,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),cljs.core.list(new cljs.core.Symbol("cljs.core","deref","cljs.core/deref",1901963335,null),new cljs.core.Symbol(null,"p1__50960#","p1__50960#",-146506198,null)))),cljs.core.list(new cljs.core.Symbol(null,"fn*","fn*",-752876845,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p1__50961#","p1__50961#",1804491121,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","every?","cljs.core/every?",1416822717,null),new cljs.core.Symbol("cljs.core","set?","cljs.core/set?",-1176684971,null),cljs.core.list(new cljs.core.Symbol("cljs.core","vals","cljs.core/vals",1473678353,null),cljs.core.list(new cljs.core.Symbol("cljs.core","deref","cljs.core/deref",1901963335,null),new cljs.core.Symbol(null,"p1__50961#","p1__50961#",1804491121,null)))))),cljs.spec.alpha.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),cljs.core.list(new cljs.core.Symbol("cljs.core","deref","cljs.core/deref",1901963335,null),new cljs.core.Symbol(null,"%","%",-950237169,null)))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","every?","cljs.core/every?",1416822717,null),new cljs.core.Symbol("cljs.core","set?","cljs.core/set?",-1176684971,null),cljs.core.list(new cljs.core.Symbol("cljs.core","vals","cljs.core/vals",1473678353,null),cljs.core.list(new cljs.core.Symbol("cljs.core","deref","cljs.core/deref",1901963335,null),new cljs.core.Symbol(null,"%","%",-950237169,null)))))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__50960_SHARP_){
return cljs.core.map_QMARK_(cljs.core.deref(p1__50960_SHARP_));
}),(function (p1__50961_SHARP_){
return cljs.core.every_QMARK_(cljs.core.set_QMARK_,cljs.core.vals(cljs.core.deref(p1__50961_SHARP_)));
})], null),null));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","transmit!","com.fulcrologic.fulcro.networking.http-remote/transmit!",226901405),new cljs.core.Symbol("cljs.core","fn?","cljs.core/fn?",71876239,null),cljs.core.fn_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","abort!","com.fulcrologic.fulcro.networking.http-remote/abort!",-554522445),new cljs.core.Symbol("cljs.core","fn?","cljs.core/fn?",71876239,null),cljs.core.fn_QMARK_);
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","fulcro-remote","com.fulcrologic.fulcro.networking.http-remote/fulcro-remote",1282855379),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","keys","cljs.spec.alpha/keys",1109346032,null),new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","transmit!","com.fulcrologic.fulcro.networking.http-remote/transmit!",226901405)], null),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","abort!","com.fulcrologic.fulcro.networking.http-remote/abort!",-554522445)], null)),cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","transmit!","com.fulcrologic.fulcro.networking.http-remote/transmit!",226901405)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","abort!","com.fulcrologic.fulcro.networking.http-remote/abort!",-554522445)], null),null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__50969){
return cljs.core.map_QMARK_(G__50969);
}),(function (G__50969){
return cljs.core.contains_QMARK_(G__50969,new cljs.core.Keyword(null,"transmit!","transmit!",-107149039));
})], null),(function (G__50969){
return ((cljs.core.map_QMARK_(G__50969)) && (cljs.core.contains_QMARK_(G__50969,new cljs.core.Keyword(null,"transmit!","transmit!",-107149039))));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"abort!","abort!",-220883953)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","transmit!","com.fulcrologic.fulcro.networking.http-remote/transmit!",226901405)], null),null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"transmit!","transmit!",-107149039)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","abort!","com.fulcrologic.fulcro.networking.http-remote/abort!",-554522445)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null))),cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","contains?","cljs.core/contains?",-976526835,null),new cljs.core.Symbol(null,"%","%",-950237169,null),new cljs.core.Keyword(null,"transmit!","transmit!",-107149039)))], null),null])));
com.fulcrologic.fulcro.networking.http_remote.xhrio_error_states = cljs.core.PersistentHashMap.fromArrays([goog.net.ErrorCode.FILE_NOT_FOUND,goog.net.ErrorCode.NO_ERROR,goog.net.ErrorCode.HTTP_ERROR,goog.net.ErrorCode.EXCEPTION,goog.net.ErrorCode.TIMEOUT,goog.net.ErrorCode.CUSTOM_ERROR,goog.net.ErrorCode.ACCESS_DENIED,goog.net.ErrorCode.OFFLINE,goog.net.ErrorCode.ABORT,goog.net.ErrorCode.FF_SILENT_ERROR],[new cljs.core.Keyword(null,"not-found","not-found",-629079980),new cljs.core.Keyword(null,"none","none",1333468478),new cljs.core.Keyword(null,"http-error","http-error",-1040049553),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"timeout","timeout",-318625318),new cljs.core.Keyword(null,"custom","custom",340151948),new cljs.core.Keyword(null,"access-denied","access-denied",959449406),new cljs.core.Keyword(null,"offline","offline",-107631935),new cljs.core.Keyword(null,"abort","abort",521193198),new cljs.core.Keyword(null,"silent","silent",-1142977785)]);
com.fulcrologic.fulcro.networking.http_remote.make_xhrio = (function com$fulcrologic$fulcro$networking$http_remote$make_xhrio(){
return (new goog.net.XhrIo());
});
com.fulcrologic.fulcro.networking.http_remote.xhrio_dispose = (function com$fulcrologic$fulcro$networking$http_remote$xhrio_dispose(xhrio){
return xhrio.dispose();
});
com.fulcrologic.fulcro.networking.http_remote.xhrio_enable_progress_events = (function com$fulcrologic$fulcro$networking$http_remote$xhrio_enable_progress_events(xhrio){
return xhrio.setProgressEventsEnabled(true);
});
com.fulcrologic.fulcro.networking.http_remote.xhrio_abort = (function com$fulcrologic$fulcro$networking$http_remote$xhrio_abort(xhrio){
return xhrio.abort();
});
com.fulcrologic.fulcro.networking.http_remote.xhrio_send = (function com$fulcrologic$fulcro$networking$http_remote$xhrio_send(xhrio,url,verb,body,headers){
return xhrio.send(url,verb,body,(function (){var G__50994 = headers;
if((G__50994 == null)){
return null;
} else {
return cljs.core.clj__GT_js(G__50994);
}
})());
});
com.fulcrologic.fulcro.networking.http_remote.xhrio_status_code = (function com$fulcrologic$fulcro$networking$http_remote$xhrio_status_code(xhrio){
return xhrio.getStatus();
});
com.fulcrologic.fulcro.networking.http_remote.xhrio_status_text = (function com$fulcrologic$fulcro$networking$http_remote$xhrio_status_text(xhrio){
return xhrio.getStatusText();
});
com.fulcrologic.fulcro.networking.http_remote.xhrio_raw_error = (function com$fulcrologic$fulcro$networking$http_remote$xhrio_raw_error(xhrio){
return xhrio.getLastErrorCode();
});
com.fulcrologic.fulcro.networking.http_remote.xhrio_error_code = (function com$fulcrologic$fulcro$networking$http_remote$xhrio_error_code(xhrio){
var status = com.fulcrologic.fulcro.networking.http_remote.xhrio_status_code(xhrio);
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$3(com.fulcrologic.fulcro.networking.http_remote.xhrio_error_states,com.fulcrologic.fulcro.networking.http_remote.xhrio_raw_error(xhrio),new cljs.core.Keyword(null,"unknown","unknown",-935977881));
var error__$1 = ((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),status)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(error,new cljs.core.Keyword(null,"http-error","http-error",-1040049553)))))?new cljs.core.Keyword(null,"network-error","network-error",-1095989517):error);
return error__$1;
});
com.fulcrologic.fulcro.networking.http_remote.xhrio_error_text = (function com$fulcrologic$fulcro$networking$http_remote$xhrio_error_text(xhrio){
return xhrio.getLastError();
});
com.fulcrologic.fulcro.networking.http_remote.xhrio_response = (function com$fulcrologic$fulcro$networking$http_remote$xhrio_response(xhrio){
return xhrio.getResponse();
});
com.fulcrologic.fulcro.networking.http_remote.xhrio_response_headers = (function com$fulcrologic$fulcro$networking$http_remote$xhrio_response_headers(xhrio){
return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(xhrio.getResponseHeaders());
});
/**
 * Given an xhrio progress event, returns a map with keys :loaded and :total, where loaded is the
 *   number of bytes transferred in the given phase (upload/download) and total is the total number
 *   of bytes to transfer (if known). 
 */
com.fulcrologic.fulcro.networking.http_remote.xhrio_progress = (function com$fulcrologic$fulcro$networking$http_remote$xhrio_progress(event){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"loaded","loaded",-1246482293),event.loaded,new cljs.core.Keyword(null,"total","total",1916810418),event.total], null);
});
/**
 * Takes the progress report from the progress network event
 *   and returns a number between 0 and 100. `phase` can be `:overall`, `:sending`, or `:receiving`. When
 *   set to `:overall` then the send phase will count for progress points between 0 and 49, and receiving phase
 *   will account for 50 to 100. When set to :sending or :receiving the entire range will count for that phase only
 *   (i.e. once sending is complete this function would return 100 throughout the receiving phase.)
 * 
 *   If total is unknown, then this function returns 0.
 */
com.fulcrologic.fulcro.networking.http_remote.progress_PERCENT_ = (function com$fulcrologic$fulcro$networking$http_remote$progress_PERCENT_(var_args){
var G__51001 = arguments.length;
switch (G__51001) {
case 1:
return com.fulcrologic.fulcro.networking.http_remote.progress_PERCENT_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.networking.http_remote.progress_PERCENT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.networking.http_remote.progress_PERCENT_.cljs$core$IFn$_invoke$arity$1 = (function (progress){
return com.fulcrologic.fulcro.networking.http_remote.progress_PERCENT_.cljs$core$IFn$_invoke$arity$2(progress,new cljs.core.Keyword(null,"overall","overall",-704031008));
}));

(com.fulcrologic.fulcro.networking.http_remote.progress_PERCENT_.cljs$core$IFn$_invoke$arity$2 = (function (progress,phase){
var current_phase = (function (){var G__51008 = progress;
if((G__51008 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"progress-phase","progress-phase",186626618).cljs$core$IFn$_invoke$arity$1(G__51008);
}
})();
var map__51004 = (function (){var G__51010 = progress;
var G__51010__$1 = (((G__51010 == null))?null:new cljs.core.Keyword(null,"progress-event","progress-event",1690048087).cljs$core$IFn$_invoke$arity$1(G__51010));
if((G__51010__$1 == null)){
return null;
} else {
return com.fulcrologic.fulcro.networking.http_remote.xhrio_progress(G__51010__$1);
}
})();
var map__51004__$1 = cljs.core.__destructure_map(map__51004);
var loaded = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__51004__$1,new cljs.core.Keyword(null,"loaded","loaded",-1246482293),(0));
var total = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__51004__$1,new cljs.core.Keyword(null,"total","total",1916810418),(0));
var vec__51005 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_phase,new cljs.core.Keyword(null,"complete","complete",-500388775)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(100),(100)], null):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_phase,new cljs.core.Keyword(null,"failed","failed",-1397425762)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null):((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_phase,new cljs.core.Keyword(null,"sending","sending",-1806704862))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"overall","overall",-704031008),phase))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(49)], null):((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_phase,new cljs.core.Keyword(null,"receiving","receiving",829203724))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"overall","overall",-704031008),phase))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(50),(100)], null):((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_phase,new cljs.core.Keyword(null,"sending","sending",-1806704862))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"sending","sending",-1806704862),phase))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(100)], null):((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_phase,new cljs.core.Keyword(null,"receiving","receiving",829203724))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"sending","sending",-1806704862),phase))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(100),(100)], null):((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_phase,new cljs.core.Keyword(null,"sending","sending",-1806704862))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"receiving","receiving",829203724),phase))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null):((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_phase,new cljs.core.Keyword(null,"receiving","receiving",829203724))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"receiving","receiving",829203724),phase))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(100)], null):null))))))));
var base = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51005,(0),null);
var max_pct = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51005,(1),null);
var slope = (max_pct - base);
var x = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),total))?(1):(loaded / total));
if((slope === (0))){
return (100);
} else {
return Math.floor((base + (x * slope)));
}
}));

(com.fulcrologic.fulcro.networking.http_remote.progress_PERCENT_.cljs$lang$maxFixedArity = 2);

com.fulcrologic.fulcro.networking.http_remote.response_types = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"default","default",-1987822328),"",new cljs.core.Keyword(null,"array-buffer","array-buffer",519008380),"arraybuffer",new cljs.core.Keyword(null,"blob","blob",1636965233),"blob",new cljs.core.Keyword(null,"document","document",-1329188687),"document",new cljs.core.Keyword(null,"text","text",-1790561697),"text"], null);
com.fulcrologic.fulcro.networking.http_remote.legal_response_types = cljs.core.set(cljs.core.keys(com.fulcrologic.fulcro.networking.http_remote.response_types));
cljs.spec.alpha.def_impl(new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","response-type","com.fulcrologic.fulcro.networking.http-remote/response-type",-1295274878),new cljs.core.Symbol("com.fulcrologic.fulcro.networking.http-remote","legal-response-types","com.fulcrologic.fulcro.networking.http-remote/legal-response-types",-126573155,null),com.fulcrologic.fulcro.networking.http_remote.legal_response_types);
com.fulcrologic.fulcro.networking.http_remote.desired_response_type = (function com$fulcrologic$fulcro$networking$http_remote$desired_response_type(p__51017){
var map__51018 = p__51017;
var map__51018__$1 = cljs.core.__destructure_map(map__51018);
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51018__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var nodes = (function (){var G__51019 = body;
var G__51019__$1 = (((G__51019 == null))?null:edn_query_language.core.query__GT_ast(G__51019));
if((G__51019__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"children","children",-940561982).cljs$core$IFn$_invoke$arity$1(G__51019__$1);
}
})();
var cnt = cljs.core.count(nodes);
var alt = cljs.core.some((function (p1__51015_SHARP_){
return new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","response-type","com.fulcrologic.fulcro.networking.http-remote/response-type",-1295274878).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(p1__51015_SHARP_));
}),nodes);
if(cljs.core.truth_((function (){var and__5000__auto__ = alt;
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((1),cnt);
} else {
return and__5000__auto__;
}
})())){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.networking.http-remote","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/networking/http_remote.cljs",122,7,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Attempt to request alternate response from HTTP remote from multiple items in a single transaction. This could mean more than one transaction got combined into a single request. See https://book.fulcrologic.com/#err-httpr-multiple-items"], null);
}),null)),null,(193),null,null,null);
} else {
}

if(cljs.core.truth_((function (){var and__5000__auto__ = alt;
if(cljs.core.truth_(and__5000__auto__)){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cnt)) && (cljs.core.contains_QMARK_(com.fulcrologic.fulcro.networking.http_remote.legal_response_types,alt)));
} else {
return and__5000__auto__;
}
})())){
var node = cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(cljs.core.first(nodes),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"params","params",710516235)], null),cljs.core.dissoc,new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","response-type","com.fulcrologic.fulcro.networking.http-remote/response-type",-1295274878));
var updated_body = com.fulcrologic.fulcro.algorithms.do_not_use.ast__GT_query(node);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [updated_body,alt], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [body,new cljs.core.Keyword(null,"default","default",-1987822328)], null);
}
});
/**
 * Client Remote Middleware to add transit encoding for normal Fulcro requests. Sets the content type and transforms an EDN
 *   body to a transit+json encoded body. addl-transit-handlers is a map from data type to transit handler (like
 *   you would pass using the `:handlers` option of transit). The additional handlers are used to encode new data types
 *   into transit. transit-transformation is a function of one argument returning a transformed transit value (like you
 *   would pass using the `:transform` option of transit). See transit documentation for more details.
 */
com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_request = (function com$fulcrologic$fulcro$networking$http_remote$wrap_fulcro_request(var_args){
var G__51025 = arguments.length;
switch (G__51025) {
case 3:
return com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_request.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_request.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_request.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_request.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_request.cljs$core$IFn$_invoke$arity$3 = (function (handler,addl_transit_handlers,transit_transformation){
var writer = com.fulcrologic.fulcro.algorithms.transit.writer.cljs$core$IFn$_invoke$arity$1((function (){var G__51027 = cljs.core.PersistentArrayMap.EMPTY;
var G__51027__$1 = (cljs.core.truth_(addl_transit_handlers)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__51027,new cljs.core.Keyword(null,"handlers","handlers",79528781),addl_transit_handlers):G__51027);
if(cljs.core.truth_(transit_transformation)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__51027__$1,new cljs.core.Keyword(null,"transform","transform",1381301764),transit_transformation);
} else {
return G__51027__$1;
}
})());
return (function (p__51029){
var map__51030 = p__51029;
var map__51030__$1 = cljs.core.__destructure_map(map__51030);
var request = map__51030__$1;
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51030__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51030__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var vec__51031 = com.fulcrologic.fulcro.networking.http_remote.desired_response_type(request);
var body__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51031,(0),null);
var response_type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51031,(1),null);
var body__$2 = cognitect.transit.write(writer,body__$1);
var headers__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(headers,"Content-Type","application/transit+json",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Accept","application/transit+json"], 0));
var G__51035 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([request,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"body","body",-2049205669),body__$2,new cljs.core.Keyword(null,"headers","headers",-835030129),headers__$1,new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"response-type","response-type",-1493770458),response_type], null)], 0));
return (handler.cljs$core$IFn$_invoke$arity$1 ? handler.cljs$core$IFn$_invoke$arity$1(G__51035) : handler.call(null, G__51035));
});
}));

(com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_request.cljs$core$IFn$_invoke$arity$2 = (function (handler,addl_transit_handlers){
return com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_request.cljs$core$IFn$_invoke$arity$3(handler,addl_transit_handlers,null);
}));

(com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_request.cljs$core$IFn$_invoke$arity$1 = (function (handler){
return com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_request.cljs$core$IFn$_invoke$arity$3(handler,null,null);
}));

(com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_request.cljs$core$IFn$_invoke$arity$0 = (function (){
return com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_request.cljs$core$IFn$_invoke$arity$3(cljs.core.identity,null,null);
}));

(com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_request.cljs$lang$maxFixedArity = 3);

/**
 * Client remote request middleware. This middleware can be added to add an X-CSRF-Token header to the request.
 */
com.fulcrologic.fulcro.networking.http_remote.wrap_csrf_token = (function com$fulcrologic$fulcro$networking$http_remote$wrap_csrf_token(var_args){
var G__51039 = arguments.length;
switch (G__51039) {
case 1:
return com.fulcrologic.fulcro.networking.http_remote.wrap_csrf_token.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.networking.http_remote.wrap_csrf_token.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.networking.http_remote.wrap_csrf_token.cljs$core$IFn$_invoke$arity$1 = (function (csrf_token){
return com.fulcrologic.fulcro.networking.http_remote.wrap_csrf_token.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,csrf_token);
}));

(com.fulcrologic.fulcro.networking.http_remote.wrap_csrf_token.cljs$core$IFn$_invoke$arity$2 = (function (handler,csrf_token){
return (function (request){
var G__51041 = cljs.core.update.cljs$core$IFn$_invoke$arity$5(request,new cljs.core.Keyword(null,"headers","headers",-835030129),cljs.core.assoc,"X-CSRF-Token",csrf_token);
return (handler.cljs$core$IFn$_invoke$arity$1 ? handler.cljs$core$IFn$_invoke$arity$1(G__51041) : handler.call(null, G__51041));
});
}));

(com.fulcrologic.fulcro.networking.http_remote.wrap_csrf_token.cljs$lang$maxFixedArity = 2);

/**
 * Client remote middleware to transform a network response to a standard Fulcro form.
 * 
 *   This returns a function that will decode a transit response iff the resulting status code is 200 and the
 *   body is not empty. For errant status codes and empty body: the response body will become an empty map.
 * 
 *   No arguments: Returns a function that can process responses, that is not further chained.
 *   handler: If supplied, the result of this transformation will be passed through the `handler`.
 *   addl-transit-handlers is equivalent to the :handlers option in transit: a map from data type to handler.
 *   
 */
com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_response = (function com$fulcrologic$fulcro$networking$http_remote$wrap_fulcro_response(var_args){
var G__51044 = arguments.length;
switch (G__51044) {
case 0:
return com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_response.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_response.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_response.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_response.cljs$core$IFn$_invoke$arity$0 = (function (){
return com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_response.cljs$core$IFn$_invoke$arity$1(cljs.core.identity);
}));

(com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_response.cljs$core$IFn$_invoke$arity$1 = (function (handler){
return com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_response.cljs$core$IFn$_invoke$arity$2(handler,null);
}));

(com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_response.cljs$core$IFn$_invoke$arity$2 = (function (handler,addl_transit_handlers){
var base_handlers = cljs.core.PersistentArrayMap.EMPTY;
var handlers = ((cljs.core.map_QMARK_(addl_transit_handlers))?cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([base_handlers,addl_transit_handlers], 0)):base_handlers);
var reader = com.fulcrologic.fulcro.algorithms.transit.reader.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"handlers","handlers",79528781),handlers], null));
return (function com$fulcrologic$fulcro$networking$http_remote$fulcro_response_handler(p__51049){
var map__51051 = p__51049;
var map__51051__$1 = cljs.core.__destructure_map(map__51051);
var response = map__51051__$1;
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51051__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51051__$1,new cljs.core.Keyword(null,"error","error",-978969032));
var outgoing_request = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51051__$1,new cljs.core.Keyword(null,"outgoing-request","outgoing-request",256391368));
var G__51053 = (function (){var map__51054 = outgoing_request;
var map__51054__$1 = cljs.core.__destructure_map(map__51054);
var response_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51054__$1,new cljs.core.Keyword(null,"response-type","response-type",-1493770458));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"default","default",-1987822328),response_type)){
try{if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"network-error","network-error",-1095989517),error)){
return response;
} else {
var new_body = ((clojure.string.blank_QMARK_(body))?cljs.core.PersistentArrayMap.EMPTY:cognitect.transit.read(reader,body));
var response__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(response,new cljs.core.Keyword(null,"body","body",-2049205669),new_body);
return response__$1;
}
}catch (e51055){var e = e51055;
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.networking.http-remote","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/networking/http_remote.cljs",184,18,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Transit decode failed! See https://book.fulcrologic.com/#warn-transit-decode-failed"], null);
}),null)),null,(209),null,null,null);

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(response,new cljs.core.Keyword(null,"status-code","status-code",-1060410130),(417),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"status-text","status-text",-1834235478),"body was either not transit or you have not installed the correct transit read/write handlers."], 0));
}} else {
return response;
}
})();
return (handler.cljs$core$IFn$_invoke$arity$1 ? handler.cljs$core$IFn$_invoke$arity$1(G__51053) : handler.call(null, G__51053));
});
}));

(com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_response.cljs$lang$maxFixedArity = 2);

/**
 * Generate a response map from the status of the given xhrio object, which could be in a complete or error state.
 */
com.fulcrologic.fulcro.networking.http_remote.extract_response = (function com$fulcrologic$fulcro$networking$http_remote$extract_response(tx,request,xhrio){
new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.any_QMARK_,new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","request","com.fulcrologic.fulcro.networking.http-remote/request",2101891015),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","xhrio","com.fulcrologic.fulcro.networking.http-remote/xhrio",1735058914),com.fulcrologic.guardrails.core._EQ__GT_,new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","response","com.fulcrologic.fulcro.networking.http-remote/response",1950226596)], null);

try{return new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"outgoing-request","outgoing-request",256391368),request,new cljs.core.Keyword(null,"original-transaction","original-transaction",-338007083),tx,new cljs.core.Keyword(null,"headers","headers",-835030129),com.fulcrologic.fulcro.networking.http_remote.xhrio_response_headers(xhrio),new cljs.core.Keyword(null,"body","body",-2049205669),com.fulcrologic.fulcro.networking.http_remote.xhrio_response(xhrio),new cljs.core.Keyword(null,"status-code","status-code",-1060410130),com.fulcrologic.fulcro.networking.http_remote.xhrio_status_code(xhrio),new cljs.core.Keyword(null,"status-text","status-text",-1834235478),com.fulcrologic.fulcro.networking.http_remote.xhrio_status_text(xhrio),new cljs.core.Keyword(null,"error","error",-978969032),com.fulcrologic.fulcro.networking.http_remote.xhrio_error_code(xhrio),new cljs.core.Keyword(null,"error-text","error-text",2021893718),com.fulcrologic.fulcro.networking.http_remote.xhrio_error_text(xhrio)], null);
}catch (e51060){var e = e51060;
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.networking.http-remote","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/networking/http_remote.cljs",202,7,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Unable to extract response from XhrIO Object",e,"See https://book.fulcrologic.com/#err-httpr-response-extract-fail"], null);
}),null)),null,(212),null,null,null);

return new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"outgoing-request","outgoing-request",256391368),request,new cljs.core.Keyword(null,"original-transaction","original-transaction",-338007083),tx,new cljs.core.Keyword(null,"body","body",-2049205669),"",new cljs.core.Keyword(null,"headers","headers",-835030129),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"status-code","status-code",-1060410130),(0),new cljs.core.Keyword(null,"status-text","status-text",-1834235478),"Internal Exception",new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"error-text","error-text",2021893718),"Internal Exception from XHRIO"], null);
}});
/**
 * Returns true if the given response looks like a low-level network error.
 */
com.fulcrologic.fulcro.networking.http_remote.was_network_error_QMARK_ = (function com$fulcrologic$fulcro$networking$http_remote$was_network_error_QMARK_(p__51063){
var map__51064 = p__51063;
var map__51064__$1 = cljs.core.__destructure_map(map__51064);
var status_code = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51064__$1,new cljs.core.Keyword(null,"status-code","status-code",-1060410130));
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51064__$1,new cljs.core.Keyword(null,"error","error",-978969032));
new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","response","com.fulcrologic.fulcro.networking.http-remote/response",1950226596),com.fulcrologic.guardrails.core._EQ__GT_,cljs.core.boolean_QMARK_], null);

return cljs.core.boolean$(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),status_code)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"http-error","http-error",-1040049553),error))));
});
com.fulcrologic.fulcro.networking.http_remote.clear_request_STAR_ = (function com$fulcrologic$fulcro$networking$http_remote$clear_request_STAR_(active_requests,id,xhrio){
new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","active-requests","com.fulcrologic.fulcro.networking.http-remote/active-requests",741863701),cljs.core.any_QMARK_,new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","xhrio","com.fulcrologic.fulcro.networking.http-remote/xhrio",1735058914),com.fulcrologic.guardrails.core._EQ__GT_,cljs.spec.alpha.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","tuple","cljs.spec.alpha/tuple",-415901908,null),new cljs.core.Symbol(null,"any?","any?",-318999933,null),new cljs.core.Symbol(null,"set?","set?",1636014792,null)),cljs.spec.alpha.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null),new cljs.core.Symbol("cljs.core","set?","cljs.core/set?",-1176684971,null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.any_QMARK_,cljs.core.set_QMARK_], null)),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword("cljs.spec.alpha","kfn","cljs.spec.alpha/kfn",672643897),(function (i__13398__auto__,v__13399__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__13399__auto__,(0));
}),new cljs.core.Keyword(null,"into","into",-150836029),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("cljs.spec.alpha","conform-all","cljs.spec.alpha/conform-all",45201917),true,new cljs.core.Keyword(null,"kind","kind",-717265803),cljs.core.map_QMARK_,new cljs.core.Keyword("cljs.spec.alpha","kind-form","cljs.spec.alpha/kind-form",-1047104697),new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Keyword("cljs.spec.alpha","describe","cljs.spec.alpha/describe",1883026911),cljs.core.list(new cljs.core.Symbol("cljs.spec.alpha","map-of","cljs.spec.alpha/map-of",153715093,null),new cljs.core.Symbol("cljs.core","any?","cljs.core/any?",-2068111842,null),new cljs.core.Symbol("cljs.core","set?","cljs.core/set?",-1176684971,null)),new cljs.core.Keyword("cljs.spec.alpha","cpred","cljs.spec.alpha/cpred",-693471218),(function (G__51066){
return cljs.core.map_QMARK_(G__51066);
})], null),null)], null);

if(cljs.core.every_QMARK_((function (p1__51065_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(xhrio,p1__51065_SHARP_);
}),cljs.core.get.cljs$core$IFn$_invoke$arity$2(active_requests,id))){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(active_requests,id);
} else {
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(active_requests,id,cljs.core.disj,xhrio);
}
});
com.fulcrologic.fulcro.networking.http_remote.response_extractor_STAR_ = (function com$fulcrologic$fulcro$networking$http_remote$response_extractor_STAR_(response_middleware,edn,real_request,xhrio){
new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","response-middleware","com.fulcrologic.fulcro.networking.http-remote/response-middleware",-2107912072),cljs.core.any_QMARK_,new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","request","com.fulcrologic.fulcro.networking.http-remote/request",2101891015),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","xhrio","com.fulcrologic.fulcro.networking.http-remote/xhrio",1735058914),com.fulcrologic.guardrails.core._EQ__GT_,new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","response","com.fulcrologic.fulcro.networking.http-remote/response",1950226596)], null);

return (function (){
var r = com.fulcrologic.fulcro.networking.http_remote.extract_response(edn,real_request,xhrio);
try{return (response_middleware.cljs$core$IFn$_invoke$arity$1 ? response_middleware.cljs$core$IFn$_invoke$arity$1(r) : response_middleware.call(null, r));
}catch (e51067){var e = e51067;
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.networking.http-remote","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/networking/http_remote.cljs",233,11,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Client response middleware threw an exception. ",e,". Defaulting to raw response. See https://book.fulcrologic.com/#err-httpr-resp-middleware-exc"], null);
}),null)),null,(213),null,null,null);

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([r,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"error","error",-978969032),((cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [null,null,new cljs.core.Keyword(null,"none","none",1333468478),null], null), null),new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(r)))?new cljs.core.Keyword(null,"middleware-failure","middleware-failure",-1809927973):new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(r)),new cljs.core.Keyword(null,"middleware-exception","middleware-exception",1033843204),e], null)], 0));
}});
});
com.fulcrologic.fulcro.networking.http_remote.cleanup_routine_STAR_ = (function com$fulcrologic$fulcro$networking$http_remote$cleanup_routine_STAR_(abort_id,active_requests,xhrio){
new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","abort-id","com.fulcrologic.fulcro.algorithms.tx-processing/abort-id",2068829184),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","active-requests","com.fulcrologic.fulcro.networking.http-remote/active-requests",741863701),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","xhrio","com.fulcrologic.fulcro.networking.http-remote/xhrio",1735058914),com.fulcrologic.guardrails.core._EQ__GT_,cljs.core.fn_QMARK_], null);

return (function (){
if(cljs.core.truth_(abort_id)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(active_requests,com.fulcrologic.fulcro.networking.http_remote.clear_request_STAR_,abort_id,xhrio);
} else {
}

return com.fulcrologic.fulcro.networking.http_remote.xhrio_dispose(xhrio);
});
});
/**
 * Returns a (fn [evt] ) that pulls the response, runs it through middleware, and reports
 * the appropriate results to the raw-ok-handler, and progress-routine. If the middleware fails,
 * it will instaed report to the error-routine (which in turn will report to the raw error handler)
 */
com.fulcrologic.fulcro.networking.http_remote.ok_routine_STAR_ = (function com$fulcrologic$fulcro$networking$http_remote$ok_routine_STAR_(progress_routine,get_response_fn,raw_ok_handler,error_routine){
new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.fn_QMARK_,cljs.core.fn_QMARK_,cljs.core.fn_QMARK_,cljs.core.fn_QMARK_,com.fulcrologic.guardrails.core._EQ__GT_,cljs.core.any_QMARK_], null);

return (function (evt){
var map__51068 = (get_response_fn.cljs$core$IFn$_invoke$arity$0 ? get_response_fn.cljs$core$IFn$_invoke$arity$0() : get_response_fn.call(null, ));
var map__51068__$1 = cljs.core.__destructure_map(map__51068);
var r = map__51068__$1;
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51068__$1,new cljs.core.Keyword(null,"error","error",-978969032));
var middleware_exception = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51068__$1,new cljs.core.Keyword(null,"middleware-exception","middleware-exception",1033843204));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(error,new cljs.core.Keyword(null,"middleware-failure","middleware-failure",-1809927973))){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.networking.http-remote","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/networking/http_remote.cljs",255,11,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Client middleware threw an exception",middleware_exception,"See https://book.fulcrologic.com/#err-httpr-middleware-exc"], null);
}),null)),null,(214),null,null,null);

(progress_routine.cljs$core$IFn$_invoke$arity$2 ? progress_routine.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"failed","failed",-1397425762),evt) : progress_routine.call(null, new cljs.core.Keyword(null,"failed","failed",-1397425762),evt));

return (error_routine.cljs$core$IFn$_invoke$arity$1 ? error_routine.cljs$core$IFn$_invoke$arity$1(r) : error_routine.call(null, r));
} else {
(progress_routine.cljs$core$IFn$_invoke$arity$2 ? progress_routine.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"complete","complete",-500388775),evt) : progress_routine.call(null, new cljs.core.Keyword(null,"complete","complete",-500388775),evt));

return (raw_ok_handler.cljs$core$IFn$_invoke$arity$1 ? raw_ok_handler.cljs$core$IFn$_invoke$arity$1(r) : raw_ok_handler.call(null, r));
}
});
});
/**
 * Return a (fn [phase progress-event]) that calls the raw update function with progress and response data merged
 *   together as a response.
 */
com.fulcrologic.fulcro.networking.http_remote.progress_routine_STAR_ = (function com$fulcrologic$fulcro$networking$http_remote$progress_routine_STAR_(get_response_fn,raw_update_fn){
new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.fn_QMARK_,cljs.core.fn_QMARK_,com.fulcrologic.guardrails.core._EQ__GT_,cljs.core.fn_QMARK_], null);

return (function com$fulcrologic$fulcro$networking$http_remote$progress_routine_STAR__$_progress_fn(phase,evt){
if(cljs.core.truth_(raw_update_fn)){
var G__51069 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"progress-phase","progress-phase",186626618),phase,new cljs.core.Keyword(null,"progress-event","progress-event",1690048087),evt], null),(get_response_fn.cljs$core$IFn$_invoke$arity$0 ? get_response_fn.cljs$core$IFn$_invoke$arity$0() : get_response_fn.call(null, ))], 0));
return (raw_update_fn.cljs$core$IFn$_invoke$arity$1 ? raw_update_fn.cljs$core$IFn$_invoke$arity$1(G__51069) : raw_update_fn.call(null, G__51069));
} else {
return null;
}
});
});
/**
 * Returns a (fn [xhrio-evt]) that pulls the progress and reports it to the progress routine and the raw
 *   error handler.
 */
com.fulcrologic.fulcro.networking.http_remote.error_routine_STAR_ = (function com$fulcrologic$fulcro$networking$http_remote$error_routine_STAR_(get_response,ok_routine,progress_routine,raw_error_handler){
new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.fn_QMARK_,cljs.core.fn_QMARK_,cljs.core.fn_QMARK_,cljs.core.fn_QMARK_,com.fulcrologic.guardrails.core._EQ__GT_,cljs.core.fn_QMARK_], null);

return (function (evt){
var r = (get_response.cljs$core$IFn$_invoke$arity$0 ? get_response.cljs$core$IFn$_invoke$arity$0() : get_response.call(null, ));
(progress_routine.cljs$core$IFn$_invoke$arity$2 ? progress_routine.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"failed","failed",-1397425762),evt) : progress_routine.call(null, new cljs.core.Keyword(null,"failed","failed",-1397425762),evt));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((200),new cljs.core.Keyword(null,"status-code","status-code",-1060410130).cljs$core$IFn$_invoke$arity$1(r))){
return (ok_routine.cljs$core$IFn$_invoke$arity$1 ? ok_routine.cljs$core$IFn$_invoke$arity$1(evt) : ok_routine.call(null, evt));
} else {
return (raw_error_handler.cljs$core$IFn$_invoke$arity$1 ? raw_error_handler.cljs$core$IFn$_invoke$arity$1(r) : raw_error_handler.call(null, r));
}
});
});
/**
 * Create a remote that (by default) communicates with the given url (which defaults to `/api`).
 * 
 *   The options map can contain:
 * 
 *   * `:url` - The URL to contact
 *   * `:request-middleware` - See below
 *   * `:response-middleware` - See below
 *   * `:make-xhrio` - A constructor function to build a goog.net.XhrIo object, initialized however you see fit.
 *   * `:preprocess-error` - A `(fn [xhrio-result] fulcro-result)`. Defaults to #(merge % {:status-code 500}).
 * 
 *   The request middleware is a `(fn [request] modified-request)`. The `request` will have `:url`, `:body`, `:method`, and `:headers`. The
 *   request middleware defaults to `wrap-fulcro-request` (which encodes the request in transit+json). The result of this
 *   middleware chain on the outgoing request becomes the real outgoing request. It is allowed to modify the `url`.
 *   If the the request middleware returns a corrupt request or throws an exception then the remote code
 *   will immediately abort the request. The return value of the middleware will be used to generate a request to `:url`,
 *   with `:method` (e.g. :post), and the given headers. The body will be sent as-is without further translation.
 * 
 *   `response-middleware` is a function that returns a function `(fn [response] mod-response)` and
 *   defaults to `wrap-fulcro-response` which decodes the raw response and transforms it back to a response that Fulcro can merge.
 * 
 *   The response will be a map containing the `:outgoing-request` which is the exact request sent on the network; `:body`, which
 *   is the raw data of the response. Additionally, there will be one or more of the following to indicate low-level
 *   details of the result: `:status-code`, `:status-text`, `:error-code` (one of :none, :exception, :http-error, :abort, or :timeout),
 *   and `:error-text`.  Middleware is allowed to morph any of this to suit its needs.
 * 
 *   DEPRECATED: If the response middleware includes a `:transaction` key in the response with EQL, then that EQL will be
 *   used in the resulting Fulcro merge steps. This can seriously screw up built-in behaviors. You are much better off ensuring
 *   that your query matches the shape of the desired response in most cases.
 * 
 *   The definition of `remote-error?` in the application will deterimine if happy-path or error handling will
 *   be applied to the response.  The default setting in Fulcro will cause
 *   a result with a 200 status code to cause whatever happy-path logic is configured for that specific
 *   response's processing.
 *   For example, see `m/default-result-action!` for mutations, and `df/internal-load` for loads. The `:body` key
 *   will be considered the response to use, and the optional `:transaction` key an override to the EQL query used
 *   for any merges.
 * 
 *   See the top-level application configuration and Developer's Guide for more details.
 */
com.fulcrologic.fulcro.networking.http_remote.fulcro_http_remote = (function com$fulcrologic$fulcro$networking$http_remote$fulcro_http_remote(p__51084){
var map__51085 = p__51084;
var map__51085__$1 = cljs.core.__destructure_map(map__51085);
var options = map__51085__$1;
var url = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__51085__$1,new cljs.core.Keyword(null,"url","url",276297046),"/api");
var request_middleware = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__51085__$1,new cljs.core.Keyword(null,"request-middleware","request-middleware",589056817),com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_request.cljs$core$IFn$_invoke$arity$0());
var response_middleware = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__51085__$1,new cljs.core.Keyword(null,"response-middleware","response-middleware",-1502080044),com.fulcrologic.fulcro.networking.http_remote.wrap_fulcro_response.cljs$core$IFn$_invoke$arity$0());
var make_xhrio = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__51085__$1,new cljs.core.Keyword(null,"make-xhrio","make-xhrio",1145513365),com.fulcrologic.fulcro.networking.http_remote.make_xhrio);
var preprocess_error = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__51085__$1,new cljs.core.Keyword(null,"preprocess-error","preprocess-error",1438756433),(function (r){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([r,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"status-code","status-code",-1060410130),(500)], null)], 0));
}));
new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.alpha.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"req-un","req-un",1074571008),new cljs.core.Keyword(null,"opt-un","opt-un",883442496),new cljs.core.Keyword(null,"gfn","gfn",791517474),new cljs.core.Keyword(null,"pred-exprs","pred-exprs",1792271395),new cljs.core.Keyword(null,"keys-pred","keys-pred",858984739),new cljs.core.Keyword(null,"opt-keys","opt-keys",1262688261),new cljs.core.Keyword(null,"req-specs","req-specs",553962313),new cljs.core.Keyword(null,"req","req",-326448303),new cljs.core.Keyword(null,"req-keys","req-keys",514319221),new cljs.core.Keyword(null,"opt-specs","opt-specs",-384905450),new cljs.core.Keyword(null,"pred-forms","pred-forms",172611832),new cljs.core.Keyword(null,"opt","opt",-794706369)],[null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","url","com.fulcrologic.fulcro.networking.http-remote/url",-1403244238),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","request-middleware","com.fulcrologic.fulcro.networking.http-remote/request-middleware",-2030599211),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","response-middleware","com.fulcrologic.fulcro.networking.http-remote/response-middleware",-2107912072),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","make-xhrio","com.fulcrologic.fulcro.networking.http-remote/make-xhrio",1348622897)], null),null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (G__51092){
return cljs.core.map_QMARK_(G__51092);
})], null),(function (G__51092){
return cljs.core.map_QMARK_(G__51092);
}),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"url","url",276297046),new cljs.core.Keyword(null,"request-middleware","request-middleware",589056817),new cljs.core.Keyword(null,"response-middleware","response-middleware",-1502080044),new cljs.core.Keyword(null,"make-xhrio","make-xhrio",1145513365)], null),cljs.core.PersistentVector.EMPTY,null,cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","url","com.fulcrologic.fulcro.networking.http-remote/url",-1403244238),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","request-middleware","com.fulcrologic.fulcro.networking.http-remote/request-middleware",-2030599211),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","response-middleware","com.fulcrologic.fulcro.networking.http-remote/response-middleware",-2107912072),new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","make-xhrio","com.fulcrologic.fulcro.networking.http-remote/make-xhrio",1348622897)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"%","%",-950237169,null)], null),cljs.core.list(new cljs.core.Symbol("cljs.core","map?","cljs.core/map?",-1390345523,null),new cljs.core.Symbol(null,"%","%",-950237169,null)))], null),null])),com.fulcrologic.guardrails.core._EQ__GT_,new cljs.core.Keyword("com.fulcrologic.fulcro.networking.http-remote","fulcro-remote","com.fulcrologic.fulcro.networking.http-remote/fulcro-remote",1282855379)], null);

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([options,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"active-requests","active-requests",1354177961),cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY),new cljs.core.Keyword(null,"supports-raw-body?","supports-raw-body?",132893061),true,new cljs.core.Keyword(null,"transmit!","transmit!",-107149039),(function com$fulcrologic$fulcro$networking$http_remote$fulcro_http_remote_$_transmit_BANG_(p__51115,p__51116){
var map__51117 = p__51115;
var map__51117__$1 = cljs.core.__destructure_map(map__51117);
var active_requests = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51117__$1,new cljs.core.Keyword(null,"active-requests","active-requests",1354177961));
var map__51118 = p__51116;
var map__51118__$1 = cljs.core.__destructure_map(map__51118);
var send_node = map__51118__$1;
var ast = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51118__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","ast","com.fulcrologic.fulcro.algorithms.tx-processing/ast",1718830373));
var raw_body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51118__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","raw-body","com.fulcrologic.fulcro.algorithms.tx-processing/raw-body",-819595969));
var result_handler = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51118__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","result-handler","com.fulcrologic.fulcro.algorithms.tx-processing/result-handler",-114902209));
var update_handler = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51118__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","update-handler","com.fulcrologic.fulcro.algorithms.tx-processing/update-handler",-1256285755));
var base_body = (function (){var or__5002__auto__ = raw_body;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return com.fulcrologic.fulcro.algorithms.do_not_use.ast__GT_query(ast);
}
})();
var ok_handler = (function (result){
try{return (result_handler.cljs$core$IFn$_invoke$arity$1 ? result_handler.cljs$core$IFn$_invoke$arity$1(result) : result_handler.call(null, result));
}catch (e51119){var e = e51119;
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.networking.http-remote","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/networking/http_remote.cljs",339,57,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,"Result handler for remote",url,"failed with an exception. See https://book.fulcrologic.com/#err-httpr-result-handler-exc"], null);
}),null)),null,(215),null,null,null);
}});
var progress_handler = (function (update_msg){
var msg = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"status-code","status-code",-1060410130),(200),new cljs.core.Keyword(null,"raw-progress","raw-progress",-329574415),cljs.core.select_keys(update_msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"progress-phase","progress-phase",186626618),new cljs.core.Keyword(null,"progress-event","progress-event",1690048087)], null)),new cljs.core.Keyword(null,"overall-progress","overall-progress",-1283185891),com.fulcrologic.fulcro.networking.http_remote.progress_PERCENT_.cljs$core$IFn$_invoke$arity$2(update_msg,new cljs.core.Keyword(null,"overall","overall",-704031008)),new cljs.core.Keyword(null,"receive-progress","receive-progress",246867556),com.fulcrologic.fulcro.networking.http_remote.progress_PERCENT_.cljs$core$IFn$_invoke$arity$2(update_msg,new cljs.core.Keyword(null,"receiving","receiving",829203724)),new cljs.core.Keyword(null,"send-progress","send-progress",1473116309),com.fulcrologic.fulcro.networking.http_remote.progress_PERCENT_.cljs$core$IFn$_invoke$arity$2(update_msg,new cljs.core.Keyword(null,"sending","sending",-1806704862))], null);
if(cljs.core.truth_(update_handler)){
try{return (update_handler.cljs$core$IFn$_invoke$arity$1 ? update_handler.cljs$core$IFn$_invoke$arity$1(msg) : update_handler.call(null, msg));
}catch (e51125){var e = e51125;
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.networking.http-remote","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/networking/http_remote.cljs",350,61,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,"Update handler for remote",url,"failed with an exception. See https://book.fulcrologic.com/#err-httpr-update-handler-exc"], null);
}),null)),null,(216),null,null,null);
}} else {
return null;
}
});
var error_handler = (function (error_result){
try{var error = (preprocess_error.cljs$core$IFn$_invoke$arity$1 ? preprocess_error.cljs$core$IFn$_invoke$arity$1(error_result) : preprocess_error.call(null, error_result));
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.networking.http-remote","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/networking/http_remote.cljs",354,57,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Remote Error",error),"See https://book.fulcrologic.com/#err-httpr-remote-err"], null);
}),null)),null,(218),null,null,null);

return (result_handler.cljs$core$IFn$_invoke$arity$1 ? result_handler.cljs$core$IFn$_invoke$arity$1(error) : result_handler.call(null, error));
}catch (e51130){var e = e51130;
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.networking.http-remote","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/networking/http_remote.cljs",357,57,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,"Error handler for remote",url,"failed with an exception. See https://book.fulcrologic.com/#err-httpr-err-handler-exc"], null);
}),null)),null,(217),null,null,null);
}});
var temp__5823__auto__ = (function (){try{var G__51133 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"headers","headers",-835030129),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"body","body",-2049205669),base_body,new cljs.core.Keyword(null,"url","url",276297046),url,new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687)], null);
return (request_middleware.cljs$core$IFn$_invoke$arity$1 ? request_middleware.cljs$core$IFn$_invoke$arity$1(G__51133) : request_middleware.call(null, G__51133));
}catch (e51131){var e = e51131;
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.networking.http-remote","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/networking/http_remote.cljs",361,56,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,"Send aborted due to middleware failure. Did you accidentally put a lambda in params? See https://book.fulcrologic.com/#err-httpr-send-abort"], null);
}),null)),null,(219),null,null,null);

var temp__5825__auto___51324 = (function (){var G__51132 = e;
var G__51132__$1 = (((G__51132 == null))?null:G__51132.data);
if((G__51132__$1 == null)){
return null;
} else {
return G__51132__$1.obj;
}
})();
if(cljs.core.truth_(temp__5825__auto___51324)){
var errant_data_51325 = temp__5825__auto___51324;
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.networking.http-remote","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/networking/http_remote.cljs",363,58,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Cannot encode",errant_data_51325], null);
}),null)),null,(220),null,null,null);
} else {
}

return null;
}})();
if(cljs.core.truth_(temp__5823__auto__)){
var real_request = temp__5823__auto__;
var abort_id = (function (){var or__5002__auto__ = new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","abort-id","com.fulcrologic.fulcro.algorithms.tx-processing/abort-id",2068829184).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","options","com.fulcrologic.fulcro.algorithms.tx-processing/options",2016767420).cljs$core$IFn$_invoke$arity$1(send_node));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.Keyword(null,"abort-id","abort-id",1559937819).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","options","com.fulcrologic.fulcro.algorithms.tx-processing/options",2016767420).cljs$core$IFn$_invoke$arity$1(send_node));
}
})();
var xhrio = (make_xhrio.cljs$core$IFn$_invoke$arity$0 ? make_xhrio.cljs$core$IFn$_invoke$arity$0() : make_xhrio.call(null, ));
var map__51136 = real_request;
var map__51136__$1 = cljs.core.__destructure_map(map__51136);
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51136__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51136__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var url__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51136__$1,new cljs.core.Keyword(null,"url","url",276297046));
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51136__$1,new cljs.core.Keyword(null,"method","method",55703592));
var response_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51136__$1,new cljs.core.Keyword(null,"response-type","response-type",-1493770458));
var http_verb = clojure.string.upper_case(cljs.core.name((function (){var or__5002__auto__ = method;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.Keyword(null,"post","post",269697687);
}
})()));
var extract_response = (function (){
return com.fulcrologic.fulcro.networking.http_remote.extract_response(body,real_request,xhrio);
});
var extract_response_mw = com.fulcrologic.fulcro.networking.http_remote.response_extractor_STAR_(response_middleware,base_body,real_request,xhrio);
var gc_network_resources = com.fulcrologic.fulcro.networking.http_remote.cleanup_routine_STAR_(abort_id,active_requests,xhrio);
var progress_routine = com.fulcrologic.fulcro.networking.http_remote.progress_routine_STAR_(extract_response,progress_handler);
var ok_routine = com.fulcrologic.fulcro.networking.http_remote.ok_routine_STAR_(progress_routine,extract_response_mw,ok_handler,error_handler);
var error_routine = com.fulcrologic.fulcro.networking.http_remote.error_routine_STAR_(extract_response_mw,ok_routine,progress_routine,error_handler);
var with_cleanup = (function (f){
return (function (evt){
try{return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(evt) : f.call(null, evt));
}finally {gc_network_resources();
}});
});
if(cljs.core.truth_(abort_id)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(active_requests,cljs.core.update,abort_id,cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([xhrio], 0));
} else {
}

if(cljs.core.truth_((function (){var and__5000__auto__ = (com.fulcrologic.fulcro.networking.http_remote.legal_response_types.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.networking.http_remote.legal_response_types.cljs$core$IFn$_invoke$arity$1(response_type) : com.fulcrologic.fulcro.networking.http_remote.legal_response_types.call(null, response_type));
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"default","default",-1987822328),response_type);
} else {
return and__5000__auto__;
}
})())){
xhrio.setResponseType(cljs.core.get.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.networking.http_remote.response_types,response_type));
} else {
}

if(cljs.core.truth_(progress_handler)){
com.fulcrologic.fulcro.networking.http_remote.xhrio_enable_progress_events(xhrio);

goog.events.listen(xhrio,goog.net.EventType.DOWNLOAD_PROGRESS,(function (p1__51074_SHARP_){
return progress_routine(new cljs.core.Keyword(null,"receiving","receiving",829203724),p1__51074_SHARP_);
}));

goog.events.listen(xhrio,goog.net.EventType.UPLOAD_PROGRESS,(function (p1__51075_SHARP_){
return progress_routine(new cljs.core.Keyword(null,"sending","sending",-1806704862),p1__51075_SHARP_);
}));
} else {
}

goog.events.listen(xhrio,goog.net.EventType.SUCCESS,with_cleanup(ok_routine));

goog.events.listen(xhrio,goog.net.EventType.ABORT,with_cleanup((function (){
return ok_handler(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status-text","status-text",-1834235478),"Cancelled",new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.tx-processing","aborted?","com.fulcrologic.fulcro.algorithms.tx-processing/aborted?",2086149958),true], null));
})));

goog.events.listen(xhrio,goog.net.EventType.ERROR,with_cleanup(error_routine));

return com.fulcrologic.fulcro.networking.http_remote.xhrio_send(xhrio,url__$1,http_verb,body,headers);
} else {
return error_handler(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"abort","abort",521193198),new cljs.core.Keyword(null,"error-text","error-text",2021893718),"Transmission was aborted because the request middleware returned nil or threw an exception"], null));
}
}),new cljs.core.Keyword(null,"abort!","abort!",-220883953),(function com$fulcrologic$fulcro$networking$http_remote$fulcro_http_remote_$_abort_BANG_(this$,id){
var temp__5823__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(new cljs.core.Keyword(null,"active-requests","active-requests",1354177961).cljs$core$IFn$_invoke$arity$1(this$)),id);
if(cljs.core.truth_(temp__5823__auto__)){
var xhrios = temp__5823__auto__;
var seq__51197 = cljs.core.seq(xhrios);
var chunk__51198 = null;
var count__51199 = (0);
var i__51200 = (0);
while(true){
if((i__51200 < count__51199)){
var xhrio = chunk__51198.cljs$core$IIndexed$_nth$arity$2(null, i__51200);
com.fulcrologic.fulcro.networking.http_remote.xhrio_abort(xhrio);


var G__51328 = seq__51197;
var G__51329 = chunk__51198;
var G__51330 = count__51199;
var G__51331 = (i__51200 + (1));
seq__51197 = G__51328;
chunk__51198 = G__51329;
count__51199 = G__51330;
i__51200 = G__51331;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__51197);
if(temp__5825__auto__){
var seq__51197__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__51197__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__51197__$1);
var G__51332 = cljs.core.chunk_rest(seq__51197__$1);
var G__51333 = c__5525__auto__;
var G__51334 = cljs.core.count(c__5525__auto__);
var G__51335 = (0);
seq__51197 = G__51332;
chunk__51198 = G__51333;
count__51199 = G__51334;
i__51200 = G__51335;
continue;
} else {
var xhrio = cljs.core.first(seq__51197__$1);
com.fulcrologic.fulcro.networking.http_remote.xhrio_abort(xhrio);


var G__51336 = cljs.core.next(seq__51197__$1);
var G__51337 = null;
var G__51338 = (0);
var G__51339 = (0);
seq__51197 = G__51336;
chunk__51198 = G__51337;
count__51199 = G__51338;
i__51200 = G__51339;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"info","info",-317069002),"com.fulcrologic.fulcro.networking.http-remote","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/networking/http_remote.cljs",396,30,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Unable to abort. No active request with abort id:",id], null);
}),null)),null,(221),null,null,null);
}
})], null)], 0));
});
/**
 * Returns a number between 0 and 100 for the overall progress.  Use in a `progress-action` section of your mutation
 *   when using the http-remote to monitor network progress.
 */
com.fulcrologic.fulcro.networking.http_remote.overall_progress = (function com$fulcrologic$fulcro$networking$http_remote$overall_progress(mutation_env){
var G__51252 = mutation_env;
var G__51252__$1 = (((G__51252 == null))?null:new cljs.core.Keyword(null,"progress","progress",244323547).cljs$core$IFn$_invoke$arity$1(G__51252));
if((G__51252__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"overall-progress","overall-progress",-1283185891).cljs$core$IFn$_invoke$arity$1(G__51252__$1);
}
});
/**
 * Returns a number between 0 and 100 for the receive progress.  Use in a `progress-action` section of your mutation
 *   when using the http-remote to monitor network progress.
 */
com.fulcrologic.fulcro.networking.http_remote.receive_progress = (function com$fulcrologic$fulcro$networking$http_remote$receive_progress(mutation_env){
var G__51253 = mutation_env;
var G__51253__$1 = (((G__51253 == null))?null:new cljs.core.Keyword(null,"progress","progress",244323547).cljs$core$IFn$_invoke$arity$1(G__51253));
if((G__51253__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"receive-progress","receive-progress",246867556).cljs$core$IFn$_invoke$arity$1(G__51253__$1);
}
});
/**
 * Returns a number between 0 and 100 for the send progress.  Use in a `progress-action` section of your mutation
 *   when using the http-remote to monitor network progress.
 */
com.fulcrologic.fulcro.networking.http_remote.send_progress = (function com$fulcrologic$fulcro$networking$http_remote$send_progress(mutation_env){
var G__51256 = mutation_env;
var G__51256__$1 = (((G__51256 == null))?null:new cljs.core.Keyword(null,"progress","progress",244323547).cljs$core$IFn$_invoke$arity$1(G__51256));
if((G__51256__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"send-progress","send-progress",1473116309).cljs$core$IFn$_invoke$arity$1(G__51256__$1);
}
});

//# sourceMappingURL=com.fulcrologic.fulcro.networking.http_remote.js.map
