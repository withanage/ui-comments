/* Dulip Withanage */

function fedoraService_old($q, $http) {

    var context = {
        "fcrepo": "http://fedora.info/definitions/v4/repository",
        "cnt": 'http://www.w3.org/2011/content',
        "rest": 'http://fedora.info/definitions/v4/rest-api',
        "ldp": "http://www.w3.org/ns/ldp",
        "dc": "http://purl.org/dc/elements/1.1/",
        "oa": "http://www.w3.org/ns/oa",
        "mixin": "http://www.jcp.org/jcr/mix/1.0",
        "oax": 'http://www.w3.org/ns/openannotation/extensions/',
    };
    var jsonld_download = {
        fetch: function(url) {
            var deferred = $q.defer();
            var config = {headers: {"Accept": "application/ld+json"}};
            $http.get(url, config).success(function(data) {
                //deferred.resolve(data);
                jsonld.compact(data, context, function(err, compacted) {
                    deferred.resolve(compacted);
                    //console.log("com", compacted);
                });
            }).error(function(headers, status) {
                if (status == 404) {
                    console.log("OK", url);
                    $http({
                        method: 'PUT',
                        url: url

                    }).success(function(data) {
                        console.log("OK", url);
                    }).error(function(err) {
                        "ERR", console.log(err)
                    });
                }


            });
            //console.info(deferred.promise);
            return deferred.promise;
            //console.log("p", deferred.promise);
        }
    };
    return jsonld_download;
}
;



function fedoraService($http) {
    var fetch = function(url) {
        return $http({
            method: 'get',
            url: url,
            headers: {"Accept": "application/json"}
        });
    };

    return {
        fetch: fetch
    };
}

