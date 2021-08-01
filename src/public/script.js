function loadParcel() {
    document.loadUnloadParcelForm.action = "/load"
    return true;
}

function unloadParcel() {
    document.loadUnloadParcelForm.action = "/unloadParcel"
    return true;
}

function getFinalData() {
    document.truckParcelDetails.action = "/parcelCount"
    return true;
}

function openAddTruckForm() {
    document.getElementById("myAddTruckForm").style.display = "block";
    return true;
}


function closeAddTruckForm() {
    document.getElementById("myAddTruckForm").style.display = '';
    return true;

}

function openCreateParcelForm() {
    document.getElementById("myCreateParcelForm").style.display = "block";
    return true;
}


function closeCreateParcelForm() {
    document.getElementById("myCreateParcelForm").style.display = '';
    return true;

}

function openLoadUnloadForm() {
    document.getElementById("myLoadUnlaodForm").style.display = "block";
    return true;
}


function closeLoadUnloadForm() {
    document.getElementById("myLoadUnlaodForm").style.display = '';
    return true;

}

function openGetTruckDetailForm() {
    document.getElementById("getTruckDetailsForm").style.display = "block";
    return true;
}


function closeGetTruckDetailForm() {
    document.getElementById("getTruckDetailsForm").style.display = '';
    return true;

}