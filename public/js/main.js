let companyId = null;

(async () => {
  await addTags();
})();

async function deleteTag() {
  const searchParams = new URLSearchParams(location.search);

  companyId = searchParams.get("company_id");

  // 6493ea9e7585b7d8a9cc6997
  const tagId = "6493ea9e7585b7d8a9cc6997";

  const response = await fetch(`/tag/${tagId}?company_id=${companyId}`, {
    method: "DELETE",
  });

  const data = await response.json();

  console.log(data);
}

async function getTags() {
  const searchParams = new URLSearchParams(location.search);

  companyId = searchParams.get("company_id");

  const response = await fetch(`/tags?company_id=${companyId}`);

  const data = await response.json();

  console.log(data);
}

async function addTags() {
  const searchParams = new URLSearchParams(location.search);

  companyId = searchParams.get("company_id");

  const response = await fetch(`/tag?company_id=${companyId}`, {
    method: "POST",
  });

  const data = await response.json();

  console.log(data);
}

async function createProxy() {
  const searchParams = new URLSearchParams(location.search);

  companyId = searchParams.get("company_id");

  const response = await fetch(`/proxy?company_id=${companyId}`, {
    method: "POST",
  });

  const data = await response.json();

  console.log(data);
}

async function removeProxy() {
  const searchParams = new URLSearchParams(location.search);

  companyId = searchParams.get("company_id");

  const response = await fetch(`/proxy?company_id=${companyId}`, {
    method: "DELETE",
  });

  const data = await response.json();

  console.log(data);
}

async function addDataloader() {
  const searchParams = new URLSearchParams(location.search);

  companyId = searchParams.get("company_id");

  const response = await fetch(`/dataloader?company_id=${companyId}`, {
    method: "POST",
  });

  const data = await response.json();

  console.log(data);
}

async function getDataloaders() {
  const searchParams = new URLSearchParams(location.search);

  companyId = searchParams.get("company_id");

  const response = await fetch(`/dataloaders?company_id=${companyId}`);

  const data = await response.json();

  console.log(data);
}

async function removeDataloader() {
  const searchParams = new URLSearchParams(location.search);

  companyId = searchParams.get("company_id");

  const dataloaderId = "6493cbdd7585b7a761cc6906";

  const response = await fetch(`/dataloader/${dataloaderId}?company_id=${companyId}`, {
    method: "DELETE",
  });

  const data = await response.json();

  console.log(data);
}


