let companyId = null;

(async () => {
  // await Promise.allSettled([addTags()]);
  // await Promise.allSettled([deleteTag(), getTags()]);
  // await deleteTag();
  await getTags();
  // await removeProxy();
  // await createProxy();
  // await deleteAllTags()
})();

async function createOrder() {
  const response = await fetch(`/api/order`, {
    method: "POST",
  });
  console.log(response);
  return response;
}

async function deleteAllTags() {
  const tagsData = await getTags();
  companyId = searchParams.get("company_id");
  const deleteTags$  = tagsData.data.tags.map(tag => {
    fetch(`/api/tag/${tag._id}?company_id=${companyId}`, {
      method: "DELETE",
    });
  });
  return await Promise.allSettled(deleteTags$);
};

async function deleteTag() {
  const searchParams = new URLSearchParams(location.search);

  companyId = searchParams.get("company_id");

  // 6493ea9e7585b7d8a9cc6997
  const tagId = "64a5c18c28a8bfda3decfb98";

  const response = await fetch(`/api/tag/${tagId}?company_id=${companyId}`, {
    method: "DELETE",
  });

  const data = await response.json();

  console.log(data);
}

async function getTags() {
  const searchParams = new URLSearchParams(location.search);

  companyId = searchParams.get("company_id");

  const response = await fetch(`/api/tags?company_id=${companyId}`);

  const data = await response.json();
  console.log(data);
  return data;
}

async function addTags() {
  const searchParams = new URLSearchParams(location.search);

  companyId = searchParams.get("company_id");

  const response = await fetch(`/api/tag?company_id=1`, {
    method: "POST",
  });

  const data = await response.json();

  console.log(data);
}

async function createProxy() {
  const searchParams = new URLSearchParams(location.search);

  companyId = searchParams.get("company_id");

  const response = await fetch(`/api/proxy?company_id=1`, {
    method: "POST",
  });

  const data = await response.json();

  console.log(data);
}

async function removeProxy() {
  const searchParams = new URLSearchParams(location.search);

  companyId = searchParams.get("company_id");

  const response = await fetch(`api/proxy?company_id=${companyId}`, {
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


