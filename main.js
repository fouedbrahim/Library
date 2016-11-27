//Q1: declaration du module
var myapp= angular.module("ProjectManagement",["ngRoute"]);

//récupérer la liste des events en utilisant la methode getAllEvents dans le service.
var ControllerclassA1= function($scope,serviceProjects){
    $scope.classAs=serviceProjects.getAllclassA();
    
};



//Q2: declaration de la variable globale "EventsData"
myapp.value("classAData",{classAs:[
                                    {id:"1",
                                    Name:"lib1",
                                    Owner:"Angelina",
                                    Address:"tunis",
                                    Type:"books",
                                    classBs:[]
                                    },
                                    {id:"2",
                                    Name:"lib2",
                                    Owner:"foued",
                                    Address:"ariana",
                                    Type:"CDs",
                                    classBs:[]
                                    },
                                    {id:"3",
                                    Name:"lib3",
                                    Owner:"Amira",
                                    Address:"sousse",
                                    Type:"books",
                                    classBs:[]
                                    }
                                    
                                ]
                         });
function classB(Name, Isbn, Autor,PubYear){
    this.Name=Name;
    this.Isbn=Isbn;
    this.Autor=Autor;
    this.PubYear=PubYear;
}

//Q3:service Factory
var service=function(classAData){
    var myObj={
        
                getAllclassA:function(){
                    return classAData.classAs;
                },
                getclassAById:function(id){
                    var classA={};
					//angular.forEach(values, function(value, key) {

                    angular.forEach(classAData.classAs,function(ev,index){
                                                        if(ev.id==id)
                                                            classA=ev;})
                    return classA;
                },
                addbook:function(id,classB){
                    var e= myObj.getclassAById(id);
                    e.classBs.push(classB);
                }
            };
    return myObj;
};



//$routeParams permet de récuperer l'ensemble des parametres dans l'url: retourne un objet
var ControllerclassB1=function($scope, serviceProjects, $routeParams){
    console.log($routeParams);
    $scope.classBs=serviceProjects.getclassAById($routeParams.id).classBs;
    $scope.addbook=function(Name,Isbn, Autor,PubYear){
        var clB= new classB(Name,Isbn,Autor,PubYear);
        serviceProjects.addbook($routeParams.id,clB);
    };
};

//système de routage: il faut ajouter un paramètre (id) à l'url de la vue participants.html
var classARoute= function($routeProvider){
    $routeProvider.when('/',{templateUrl:"home.html"})
                .when('/books/:id',{templateUrl:"books.html"})
                .otherwise({redirectTo:'/'});
};



//Q3: attacher le service au module
myapp.factory("serviceProjects",service);
myapp.controller("ControllerclassA",ControllerclassA1);
myapp.controller("ControllerclassB",ControllerclassB1);
myapp.config(classARoute);